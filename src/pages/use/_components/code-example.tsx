// code-example.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";

export function CodeExample() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          use() Hook 코드 예제
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-3">
              기본 사용법 - Promise와 함께
            </Badge>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`// api.ts
export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

// component.tsx
import { use, Suspense } from 'react';

function UserList() {
  // ✨ use() hook의 핵심: Promise를 직접 사용!
  const users = use(fetchUsers());

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// 상위 컴포넌트에서 Suspense로 감싸기
function App() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <UserList />
    </Suspense>
  );
}`}
            </pre>
          </div>

          <div>
            <Badge variant="secondary" className="mb-3">
              Context와 함께 사용
            </Badge>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`// context.tsx
const DataContext = createContext<{
  usersPromise: Promise<User[]>;
}>()

// component.tsx
import { use } from 'react';

function UserList() {
  const context = use(DataContext); // ✨ Context도 use()로!
  const users = use(context.usersPromise); // ✨ Promise도 use()로!

  return <div>{/* 사용자 목록 렌더링 */}</div>;
}`}
            </pre>
          </div>

          <div>
            <Badge variant="secondary" className="mb-3">
              조건부 사용
            </Badge>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`function ConditionalData({ shouldFetch }: { shouldFetch: boolean }) {
  let data = null;

  if (shouldFetch) {
    // ✨ 조건부로 use() 사용 가능!
    data = use(fetchData());
  }

  return <div>{data ? '데이터 있음' : '데이터 없음'}</div>;
}`}
            </pre>
          </div>

          <div>
            <Badge variant="secondary" className="mb-3">
              주요 특징 및 차이점
            </Badge>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  ✅ use() Hook 장점
                </h4>
                <ul className="space-y-1 text-green-700">
                  <li>• Promise와 Context 모두 처리</li>
                  <li>• 조건부 사용 가능</li>
                  <li>• Suspense와 완벽 통합</li>
                  <li>• 간단하고 직관적인 API</li>
                  <li>• 서버 컴포넌트에서도 사용 가능</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  🔄 기존 방식과 비교
                </h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• useEffect + useState → use(promise)</li>
                  <li>• useContext → use(context)</li>
                  <li>• 로딩 상태 관리 → Suspense</li>
                  <li>• 에러 처리 → Error Boundary</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <Badge variant="secondary" className="mb-3">
              Server Component vs Client Component
            </Badge>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`// Server Component
async function ServerUserList() {
  // 서버에서 직접 데이터 가져오기
  const users = await fetchUsers();
  return <div>{/* 렌더링 */}</div>;
}

// Client Component
'use client';
function ClientUserList() {
  // use() hook으로 Promise 처리
  const users = use(fetchUsers());
  return <div>{/* 렌더링 */}</div>;
}`}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
