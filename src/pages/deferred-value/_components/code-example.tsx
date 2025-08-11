export default function CodeExample() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4 text-green-400">코드 예제</h3>
      <pre className="text-sm">
        <code>{`import { useState, useDeferredValue } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색..."
      />
      {/* 즉시 업데이트 - 입력 응답성 유지 */}
      <div>입력 중: {query}</div>

      {/* 지연 업데이트 - 무거운 컴포넌트에 사용 */}
      <ExpensiveList searchQuery={deferredQuery} />
    </div>
  );
}`}</code>
      </pre>
    </div>
  );
}
