import { useMemo, useState, useEffect } from "react";
import { Clock, Zap, Activity } from "lucide-react";

// 무거운 렌더링을 시뮬레이션하는 컴포넌트
export default function ExpensiveList({ query = "", isDeferred = false }) {
  const [renderCount, setRenderCount] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [renderTime, setRenderTime] = useState(0);

  // 렌더링 시작 시간 기록
  useEffect(() => {
    const startTime = performance.now();
    setIsRendering(true);
    setRenderCount((prev) => prev + 1);

    // 렌더링 완료 시간 측정
    const timer = setTimeout(() => {
      setRenderTime(performance.now() - startTime);
      setIsRendering(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [query]);

  const items = useMemo(() => {
    // 의도적으로 무거운 연산을 추가
    const startTime = performance.now();
    const list = [];

    // 20000개로 증가하고 더 무거운 연산 추가
    for (let i = 0; i < 20000; i++) {
      // 무거운 문자열 연산 시뮬레이션
      let itemText = `Item ${i + 1}: ${query || "No search"}`;

      // 추가적인 무거운 연산
      for (let j = 0; j < 10; j++) {
        itemText = itemText
          .split("")
          .reverse()
          .join("")
          .split("")
          .reverse()
          .join("");
      }

      list.push(itemText);

      // 매 1000개마다 블로킹 시뮬레이션
      if (i % 1000 === 0) {
        const blockStart = performance.now();
        while (performance.now() - blockStart < 1) {
          // 1ms 블로킹
        }
      }
    }

    console.log(
      `${isDeferred ? "Deferred" : "Immediate"} list creation took: ${performance.now() - startTime}ms`,
    );
    return list;
  }, [query, isDeferred]);

  // 필터링된 항목들 (더 무거운 연산)
  const filteredItems = useMemo(() => {
    const startTime = performance.now();

    if (!query) {
      const result = items.slice(0, 100); // 더 많은 항목 표시
      console.log(
        `${isDeferred ? "Deferred" : "Immediate"} filtering (no query) took: ${performance.now() - startTime}ms`,
      );
      return result;
    }

    // 더 복잡한 필터링 로직
    const result = items
      .filter((item) => {
        // 여러 조건으로 필터링하여 연산 부하 증가
        const lowerItem = item.toLowerCase();
        const lowerQuery = query.toLowerCase();
        return (
          lowerItem.includes(lowerQuery) ||
          lowerItem.split(" ").some((word) => word.startsWith(lowerQuery)) ||
          lowerItem.split(" ").some((word) => word.endsWith(lowerQuery))
        );
      })
      .map((item, index) => ({
        id: index,
        text: item,
        score: Math.random() * 100, // 정렬을 위한 무작위 점수
      }))
      .sort((a, b) => b.score - a.score) // 정렬 추가
      .slice(0, 150); // 더 많은 결과 표시

    console.log(
      `${isDeferred ? "Deferred" : "Immediate"} filtering took: ${performance.now() - startTime}ms`,
    );
    return result;
  }, [items, query, isDeferred]);

  return (
    <div className="space-y-2">
      {/* 렌더링 상태 표시 */}
      <div className="flex items-center justify-between gap-2 text-sm text-gray-600 mb-3 p-3 bg-white rounded-lg border">
        <div className="flex items-center gap-2">
          {isDeferred ? (
            <Clock className="w-4 h-4" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          <span className="font-medium">
            {isDeferred ? "Deferred" : "Immediate"} Rendering
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isRendering && (
            <div className="flex items-center gap-1 text-orange-600">
              <Activity className="w-3 h-3 animate-pulse" />
              <span className="text-xs">Rendering...</span>
            </div>
          )}
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {filteredItems.length} items
          </span>
          <span className="text-xs bg-blue-100 px-2 py-1 rounded">
            렌더링 #{renderCount}
          </span>
          {renderTime > 0 && (
            <span className="text-xs bg-green-100 px-2 py-1 rounded">
              {renderTime.toFixed(1)}ms
            </span>
          )}
        </div>
      </div>

      {/* 성능 통계 */}
      <div className="text-xs text-gray-500 mb-2 p-2 bg-gray-50 rounded">
        <div className="grid grid-cols-2 gap-2">
          <div>총 데이터: {items.length.toLocaleString()}개</div>
          <div>표시 중: {filteredItems.length}개</div>
          <div>검색어: "{query || "없음"}"</div>
          <div
            className={`${isRendering ? "text-red-600 font-medium" : "text-green-600"}`}
          >
            상태: {isRendering ? "렌더링 중..." : "완료"}
          </div>
        </div>
      </div>

      {/* 리스트 영역 */}
      <div
        className={`h-80 overflow-y-auto border rounded-lg p-3 transition-all duration-200 ${
          isRendering ? "bg-yellow-50 border-yellow-200" : "bg-gray-50"
        }`}
      >
        {isRendering && (
          <div className="flex items-center justify-center py-8 text-orange-600">
            <Activity className="w-5 h-5 animate-spin mr-2" />
            <span>무거운 연산 처리 중...</span>
          </div>
        )}
        {filteredItems.map((item, index) => (
          <div
            key={typeof item === "object" ? item.id : index}
            className={`p-3 mb-2 bg-white rounded shadow-sm text-sm transition-all duration-150 ${
              isRendering ? "opacity-70" : "opacity-100"
            }`}
            style={{
              animationDelay: `${index * 10}ms`,
            }}
          >
            <div className="flex justify-between items-center">
              <span>{typeof item === "object" ? item.text : item}</span>
              {typeof item === "object" && (
                <span className="text-xs text-gray-400 ml-2">
                  Score: {item.score.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        ))}

        {!isRendering && filteredItems.length === 0 && query && (
          <div className="text-center py-8 text-gray-500">
            "{query}"에 대한 검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
