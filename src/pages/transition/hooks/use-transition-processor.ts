import { useState, useTransition } from "react";

interface ProcessedDataItem {
  id: number;
  value: number;
  processed: boolean;
  timestamp: number;
}

export const useTransitionProcessor = () => {
  const [processedData, setProcessedData] = useState<ProcessedDataItem[]>([]);
  const [isPending, startTransition] = useTransition();
  const [useTransitionEnabled, setUseTransitionEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isManualProcessing, setIsManualProcessing] = useState(false);

  // 더 무거운 동기적 처리 함수
  const heavyProcessing = async () => {
    const totalItems = 30000; // 아이템 수 증가
    const newData: ProcessedDataItem[] = [];
    const batchSize = 500; // 배치 크기 줄임

    for (let i = 0; i < totalItems; i++) {
      let value = 0;

      // 훨씬 더 무거운 계산 - 복잡한 수학 연산
      for (let j = 0; j < 300; j++) {
        // 반복 횟수 증가
        value += Math.sin(i * j) * Math.cos(i + j);
        value += Math.sqrt(i + j + 1) * Math.log(i + j + 2);
        value += Math.pow(i % 10, j % 5);
        value += Math.tan(i / (j + 1)) * Math.atan(j / (i + 1));

        // CPU 집약적인 추가 연산
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

      // 더 자주 업데이트 (매 500개마다)
      if (i % batchSize === 0) {
        const currentProgress = Math.round((i / totalItems) * 100);
        setProgress(currentProgress);
        setProcessedData([...newData]);

        // 강제로 처리 시간을 늘리기 위한 추가 지연
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    // 최종 결과
    setProgress(100);
    setProcessedData(newData);
  };

  // 동기적 버전 (useTransition 없이 사용할 때)
  const heavyProcessingSync = () => {
    const totalItems = 30000;
    const newData: ProcessedDataItem[] = [];
    const batchSize = 500;

    for (let i = 0; i < totalItems; i++) {
      let value = 0;

      // 같은 무거운 계산
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

      // UI 업데이트 (동기적으로)
      if (i % batchSize === 0) {
        const currentProgress = Math.round((i / totalItems) * 100);
        setProgress(currentProgress);
        setProcessedData([...newData]);
      }
    }

    setProgress(100);
    setProcessedData(newData);
  };

  const handleStartProcessing = () => {
    setProgress(0);
    setProcessedData([]);
    setIsManualProcessing(true);

    if (useTransitionEnabled) {
      startTransition(async () => {
        try {
          await heavyProcessing();
        } finally {
          setIsManualProcessing(false);
        }
      });
    } else {
      // useTransition 없이 처리 - UI 완전 블로킹
      setTimeout(() => {
        try {
          heavyProcessingSync();
        } finally {
          setIsManualProcessing(false);
        }
      }, 0);
    }
  };

  const handleReset = () => {
    setProcessedData([]);
    setProgress(0);
    setIsManualProcessing(false);
  };

  const toggleTransition = () => {
    setUseTransitionEnabled(!useTransitionEnabled);
    handleReset();
  };

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
