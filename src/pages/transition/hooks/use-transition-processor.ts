import { useState, useTransition } from "react";

interface ProcessedDataItem {
  id: number;
  value: number;
  processed: boolean;
  timestamp: number;
}

export const useTransitionProcessor = () => {
  /***************************************************
   * 상태 관리
   ***************************************************/

  // 처리된 결과 데이터들
  const [processedData, setProcessedData] = useState<ProcessedDataItem[]>([]);

  // useTransition 훅: 무거운 작업을 "비긴급 업데이트"로 처리
  // isPending: 작업 진행 중인지 알려주는 상태
  // startTransition: 비긴급 업데이트를 시작하는 함수
  const [isPending, startTransition] = useTransition();

  // useTransition 사용 여부를 토글하는 상태
  const [useTransitionEnabled, setUseTransitionEnabled] = useState(true);

  // 진행률 (0-100%)
  const [progress, setProgress] = useState(0);

  // 수동 처리중인지에 대한 상태 (useTransition 미사용 시 사용: isPending은 오직 startTransition 내부의 작업만 추적)
  const [isManualProcessing, setIsManualProcessing] = useState(false);

  /***************************************************
   * 🟢 비동기 처리 함수 (useTransition 활용)
   *
   * 핵심: setTimeout으로 중간중간 "휴식"을 만들어서
   * React가 UI를 업데이트할 기회를 제공!
   ***************************************************/
  const heavyProcessing = async () => {
    const totalItems = 30000;
    const newData: ProcessedDataItem[] = [];
    const batchSize = 500; // 500개씩 처리 후 휴식

    for (let i = 0; i < totalItems; i++) {
      let value = 0;

      /***************************************************
       * 일부러 무거운 계산을 만든 부분
       * CPU를 많이 사용해서 "무거운 작업" 시뮬레이션
       ***************************************************/
      for (let j = 0; j < 300; j++) {
        value += Math.sin(i * j) * Math.cos(i + j);
        value += Math.sqrt(i + j + 1) * Math.log(i + j + 2);
        value += Math.pow(i % 10, j % 5);
        value += Math.tan(i / (j + 1)) * Math.atan(j / (i + 1));

        // 더 무거운 계산
        for (let k = 0; k < 10; k++) {
          value += Math.random() * Math.PI;
        }
      }

      // 처리된 데이터 추가
      newData.push({
        id: i,
        value: Math.round(value * 1000) / 1000,
        processed: true,
        timestamp: Date.now(),
      });

      /***************************************************
       * 🔑 핵심 부분: 500개 처리할 때마다 "휴식" 시간!
       ***************************************************/
      if (i % batchSize === 0) {
        // 진행률 업데이트
        const currentProgress = Math.round((i / totalItems) * 100);
        setProgress(currentProgress);
        setProcessedData([...newData]);

        /***************************************************
         * 💡 마법의 한 줄!
         *
         * 동작 순서:
         * 1. setTimeout(resolve, 10) 호출
         * 2. setTimeout이 콜스택에서 제거됨
         * 3. 10ms 동안 콜스택이 비워짐 ⭐
         * 4. React가 이 틈에 UI 업데이트!
         * 5. 10ms 후 resolve(setTimeout에 전달된 콜백함수)가 콜스택에 올라와서 실행
         * 6. 다음 배치 처리 시작
         ***************************************************/
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    // 최종 결과 설정
    setProgress(100);
    setProcessedData(newData);
  };

  /***************************************************
   * 🔴 동기 처리 함수 (일반적인 처리)
   *
   * 특징: setTimeout이 없어서 한 번에 모든 처리 실행
   * 결과: 처리완료까지 UI가 완전히 얼어붙음!
   ***************************************************/
  const heavyProcessingSync = () => {
    const totalItems = 30000;
    const newData: ProcessedDataItem[] = [];
    const batchSize = 500;

    /***************************************************
     * 이 for문이 끝날 때까지 JavaScript는 다른 일을 못함!
     * = React도 UI 업데이트를 못함
     ***************************************************/
    for (let i = 0; i < totalItems; i++) {
      let value = 0;

      // 똑같은 무거운 계산
      for (let j = 0; j < 300; j++) {
        value += Math.sin(i * j) * Math.cos(i + j);
        value += Math.sqrt(i + j + 1) * Math.log(i + j + 2);
        value += Math.pow(i % 10, j % 5);
        value += Math.tan(i / (j + 1)) * Math.atan(j / (i + 1));

        for (let k = 0; k < 10; k++) {
          value += Math.random() * Math.PI;
        }
      }

      newData.push({
        id: i,
        value: Math.round(value * 1000) / 1000,
        processed: true,
        timestamp: Date.now(),
      });

      /***************************************************
       * 🚫 이 부분이 문제!
       *
       * setProgress는 호출되지만 화면에 반영되지 않음
       * 왜? 이 함수가 끝나야 React가 리렌더링하기 때문!
       ***************************************************/
      if (i % batchSize === 0) {
        const currentProgress = Math.round((i / totalItems) * 100);
        setProgress(currentProgress); // 호출은 됨, 하지만 화면에 안 보임
        setProcessedData([...newData]); // 이것도 마찬가지
      }
    }

    // 함수가 끝나는 순간에만 UI가 업데이트됨
    setProgress(100);
    setProcessedData(newData);
  };

  /***************************************************
   * 처리 시작 함수
   ***************************************************/
  const handleStartProcessing = () => {
    // 초기화
    setProgress(0);
    setProcessedData([]);

    if (useTransitionEnabled) {
      /***************************************************
       * 🟢 useTransition 사용 모드
       *
       * startTransition으로 감싸면:
       * - 무거운 작업이 "비긴급" 업데이트가 됨
       * - 사용자 입력이나 다른 UI 업데이트가 우선권을 가짐
       * - 전체적으로 앱이 반응성을 유지함
       ***************************************************/
      startTransition(async () => {
        await heavyProcessing(); // 비동기 처리 (setTimeout 포함)
      });
    } else {
      setIsManualProcessing(true);

      /***************************************************
       * 🔴 useTransition 미사용 모드
       *
       * setTimeout(..., 0)을 사용하는 이유:
       * - 바로 실행하면 버튼 클릭 이벤트 처리가 끝나지 않아서
       *   UI가 업데이트되지 않을 수 있음
       * - 0ms 지연으로 다음 이벤트 루프에서 실행하게 함
       ***************************************************/
      setTimeout(() => {
        try {
          heavyProcessingSync(); // 동기 처리 (UI 블로킹)
        } finally {
          setIsManualProcessing(false);
        }
      }, 0);
    }
  };

  /***************************************************
   * 리셋 함수
   ***************************************************/
  const handleReset = () => {
    setProcessedData([]);
    setProgress(0);
    setIsManualProcessing(false);
  };

  /***************************************************
   * useTransition 토글 함수
   ***************************************************/
  const toggleTransition = () => {
    setUseTransitionEnabled(!useTransitionEnabled);
    handleReset(); // 토글할 때마다 상태 초기화
  };

  /***************************************************
   * 반환값
   *
   * isProcessing: isPending(useTransition) 또는
   *              isManualProcessing(일반 처리) 중 하나라도 true면 처리 중
   ***************************************************/
  return {
    processedData,
    isProcessing: isPending || isManualProcessing,
    handleStartProcessing,
    handleReset,
    useTransitionEnabled,
    toggleTransition,
    progress,
  };
};
