// main-page.tsx
"use client";

import { Suspense } from "react";
import { DataProvider } from "@/pages/use/provider/data-provider.tsx";
import { UserList } from "@/pages/use/_components/user-list.tsx";
import { CodeExample } from "@/pages/use/_components/code-example.tsx";
import IntroduceCard from "@/pages/use/_components/introduce-card.tsx";
import { UserListLoading } from "@/pages/use/_components/loading.tsx";

function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 소개 내용 */}
        <IntroduceCard />

        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Suspense fallback={<UserListLoading />}>
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
