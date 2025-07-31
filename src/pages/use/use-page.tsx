// main-page.tsx
"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Info, Sparkles, Loader2, RefreshCw } from "lucide-react";
import {
  DataProvider,
  useDataContext,
} from "@/pages/use/_components/data-context.tsx";
import { UserList } from "@/pages/use/_components/user-list.tsx";
import { CodeExample } from "@/pages/use/_components/code-example.tsx";

function PageContent() {
  const { refreshUsers } = useDataContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-blue-600" />
                use() Hook
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-normal">
                  React 19
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl">
                React 19의 새로운 use() Hook을 사용하여 Promise와 Context를 직접
                사용하는 방법을 학습해보세요. 실제 JSONPlaceholder API를
                호출하여 데이터를 가져옵니다.
              </p>
            </div>
            <Button
              onClick={refreshUsers}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              새로고침
            </Button>
          </div>
        </div>

        {/* 설명 카드 */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-blue-900">use() Hook이란?</AlertTitle>
          <AlertDescription className="text-blue-800">
            React 19에서 도입된 새로운 Hook으로, Promise와 Context를 직접 사용할
            수 있습니다. 기존의 useEffect + useState 패턴을 대체하며, Suspense와
            완벽하게 통합됩니다. 조건부로도 사용할 수 있어 더욱 유연한 데이터
            처리가 가능합니다.
          </AlertDescription>
        </Alert>

        {/* 특징 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Promise 직접 사용</h3>
            <p className="text-gray-600 text-sm">
              useEffect나 useState 없이 Promise를 직접 사용하여 비동기 데이터를
              처리할 수 있습니다.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Context 통합</h3>
            <p className="text-gray-600 text-sm">
              useContext 대신 use(Context)로 Context 값에 접근할 수 있으며,
              조건부 사용도 가능합니다.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Loader2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Suspense 통합</h3>
            <p className="text-gray-600 text-sm">
              Suspense와 완벽하게 통합되어 로딩 상태를 자동으로 처리하고 에러
              바운더리와도 연동됩니다.
            </p>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                  <p className="text-gray-600">
                    JSONPlaceholder API에서 사용자 데이터를 가져오는 중...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    use() Hook이 Promise를 처리하고 있습니다
                  </p>
                </div>
              }
            >
              <UserList />
            </Suspense>
          </div>
        </div>

        {/* 코드 예시 */}
        <CodeExample />
      </div>
    </div>
  );
}

export default function UsePage() {
  return (
    <DataProvider>
      <PageContent />
    </DataProvider>
  );
}
