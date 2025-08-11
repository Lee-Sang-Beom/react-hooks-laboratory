import { useDeferredValue, useState } from "react";
import { Search, Zap, Clock, Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import ExpensiveList from "./_components/expensive-list";
import CodeExample from "@/pages/deferred-value/_components/code-example.tsx";

export default function DeferredValuePage() {
  const navigator = useNavigate();

  // 🎯 핵심: 사용자 입력은 즉시 반응, 무거운 UI는 지연 처리
  const [query, setQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(query); // 자동 디바운싱 + 성능 최적화

  const [showComparison, setShowComparison] = useState(false);

  const handleGoBack = () => {
    navigator("/");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          useDeferredValue Hook
        </h1>
        <div className="text-lg text-gray-600 max-w-4xl mx-auto">
          React의 useDeferredValue Hook을 사용하여 사용자 입력의 즉각적인
          반응성을 유지하면서 무거운 렌더링 작업을 지연시켜 성능을
          최적화해보세요.
        </div>
      </div>

      {/* 설명 카드 */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>useDeferredValue란?</AlertTitle>
        <AlertDescription>
          입력은 즉시 반응하고, 무거운 렌더링은 늦게 표시하여
          <span className="font-semibold text-blue-600">
            {" "}
            자동 디바운싱 + 성능 최적화
          </span>
          를 제공합니다. 사용자가 빠르게 타이핑할 때 UI가 버벅거리지 않도록
          도와줍니다.
        </AlertDescription>
      </Alert>

      {/* 실시간 값 비교 - 핵심 개념 시각화 */}
      <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-gray-900">실시간 값 비교</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-orange-700">
                즉시 반응 (query)
              </span>
            </div>
            <div className="p-3 bg-orange-50 rounded border border-orange-200">
              <code className="text-sm">"{query}"</code>
              <p className="text-xs text-orange-600 mt-1">
                타이핑할 때마다 즉시 변경됨 → 입력 응답성 유지
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-blue-700">
                지연 처리 (deferredQuery)
              </span>
            </div>
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <code className="text-sm">"{deferredQuery}"</code>
              <p className="text-xs text-blue-600 mt-1">
                타이핑 완료 후 업데이트 → 자동 디바운싱 효과
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
          <p className="text-sm text-yellow-700">
            💡 <strong>관찰 포인트:</strong> 빠르게 타이핑하면 왼쪽은 실시간
            변경, 오른쪽은 완료 후 한 번만 변경됩니다.
          </p>
        </div>
      </div>

      {/* 검색 입력 */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query} // 즉시 반응하는 값 사용
            onChange={(e) => setQuery(e.target.value)}
            placeholder="빠르게 타이핑해보세요... (예: test → 지우기 → hello)"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showComparison}
              onChange={(e) => setShowComparison(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">비교 모드 (차이점 확인)</span>
          </label>
        </div>
      </div>

      {/* 동작 원리 설명 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">일반 방식 (문제점)</h3>
          </div>
          <div className="text-sm text-red-700 space-y-2">
            <div className="font-mono text-xs bg-red-100 p-2 rounded">
              타이핑 → 즉시 무거운 렌더링 → UI 블로킹 → 버벅거림
            </div>
            <p>매 입력마다 20,000개 데이터 처리로 성능 저하 발생</p>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">
              useDeferredValue (해결)
            </h3>
          </div>
          <div className="text-sm text-blue-700 space-y-2">
            <div className="font-mono text-xs bg-blue-100 p-2 rounded">
              타이핑 → 입력만 즉시 → 렌더링은 지연 → 부드러운 경험
            </div>
            <p>입력 완료 후 한 번만 처리하여 성능 최적화</p>
          </div>
        </div>
      </div>

      {/* 사용 예시 시나리오 */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-green-600" />
          실제 사용 시나리오
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded shadow-sm">
            <h4 className="font-medium text-green-700 mb-2">검색 기능</h4>
            <p className="text-gray-600">
              사용자가 검색어 입력 중에도 입력창은 부드럽게 동작
            </p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <h4 className="font-medium text-blue-700 mb-2">데이터 시각화</h4>
            <p className="text-gray-600">
              필터 조건 변경 시 차트 업데이트 지연 처리
            </p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <h4 className="font-medium text-purple-700 mb-2">실시간 필터링</h4>
            <p className="text-gray-600">
              대량 데이터 목록의 즉석 필터링 최적화
            </p>
          </div>
        </div>
      </div>

      {/* 데모 영역 */}
      {showComparison ? (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-900 mb-2">
              성능 비교 테스트
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              아래 두 리스트를 보면서 빠르게 "test" → 지우기 → "hello" →
              지우기를 반복해보세요. 렌더링 횟수와 응답성의 차이를 확인할 수
              있습니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  즉시 업데이트 (매번 렌더링)
                </h3>
                <p className="text-sm text-red-600 mt-1">
                  query 값 사용 → 타이핑할 때마다 리렌더링
                </p>
              </div>
              <ExpensiveList query={query} isDeferred={false} />
            </div>
            <div className="space-y-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  지연 업데이트 (완료 후 렌더링)
                </h3>
                <p className="text-sm text-blue-600 mt-1">
                  deferredQuery 값 사용 → 타이핑 완료 후 한 번만 리렌더링
                </p>
              </div>
              <ExpensiveList query={deferredQuery} isDeferred={true} />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              useDeferredValue 실제 동작
            </h3>
            <p className="text-sm text-blue-600 mt-1">
              deferredQuery를 사용한 최적화된 렌더링을 경험해보세요.
            </p>
          </div>
          <ExpensiveList query={deferredQuery} isDeferred={true} />
        </div>
      )}

      {/* 코드 예제 */}
      <CodeExample />

      {/* 핵심 정리 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">
          🎯 useDeferredValue 한 줄 정리
        </h3>
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <p className="text-lg font-medium text-gray-900 text-center">
            "입력은 즉시 반응, 무거운 UI는 늦게 표시" + "자동 디바운싱"
          </p>
          <p className="text-sm text-gray-600 text-center mt-2">
            = 사용자 경험 향상 + 성능 최적화를 한 번에!
          </p>
        </div>
      </div>

      {/* 사용 팁 */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">
          💡 실전 사용 팁
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-yellow-700">테스트 방법</h4>
            <ul className="space-y-1 text-yellow-700 text-sm">
              <li>• 빠르게 타이핑 → 지연 효과 확인</li>
              <li>• 브라우저 콘솔 → 렌더링 시간 로그 확인</li>
              <li>• 렌더링 횟수 카운터 → 호출 빈도 비교</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-yellow-700">적용 영역</h4>
            <ul className="space-y-1 text-yellow-700 text-sm">
              <li>• 검색, 필터링, 정렬 등 무거운 연산</li>
              <li>• 대량 데이터 시각화</li>
              <li>• 실시간 업데이트가 필요한 복잡한 UI</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
