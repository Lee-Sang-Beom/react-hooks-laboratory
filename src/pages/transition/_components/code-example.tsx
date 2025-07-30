import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";

export function CodeExample() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          useTransition 코드 예제
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-3">
              기본 사용법
            </Badge>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`import { useState, useTransition } from 'react';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term) => {
    startTransition(() => {
      // 무거운 업데이트를 transition으로 래핑
      const filtered = heavySearchOperation(term);
      setResults(filtered);
    });
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value); // 즉시 업데이트
          handleSearch(e.target.value);   // transition으로 처리
        }}
      />
      {isPending && <div>검색 중...</div>}
      <ResultsList results={results} />
    </div>
  );
}`}
            </pre>
          </div>

          <div>
            <Badge variant="secondary" className="mb-3">
              주요 특징
            </Badge>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✅ 장점</h4>
                <ul className="space-y-1 text-green-700">
                  <li>• UI 블로킹 방지</li>
                  <li>• 사용자 인터랙션 우선순위 보장</li>
                  <li>• 무거운 업데이트의 백그라운드 처리</li>
                  <li>• 로딩 상태 제공</li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  ⚠️ 주의사항
                </h4>
                <ul className="space-y-1 text-yellow-700">
                  <li>• transition 내부는 동기적으로 실행</li>
                  <li>• 긴급하지 않은 업데이트에만 사용</li>
                  <li>• setState 호출만 transition 처리</li>
                  <li>• 텍스트 입력은 즉시 업데이트 유지</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
