"use client";

import { use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Globe, MapPin } from "lucide-react";
import { useState } from "react";
import { UserPosts } from "@/pages/use/_components/user-posts.tsx";
import { useDataContext } from "@/pages/use/hooks/use-data-context.ts";

// 🟢 use() hook을 사용하는 컴포넌트
export function UserList() {
  const { usersPromise } = useDataContext();

  // ✨ use() hook의 핵심: Promise를 직접 사용!
  // use() Hook이 pending Promise를 만나면 자동으로 컴포넌트를 "suspend"상태로 만듦
  // 즉, Suspense 경계 내에서 Promise가 resolve될 때까지 자동으로 대기하는 것
  const users = use(usersPromise);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <User className="w-5 h-5" />
          사용자 목록 ({users.length}명)
        </h3>
        <Badge variant="outline" className="text-green-700 border-green-300">
          use() hook 사용중
        </Badge>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

function UserCard({ user }: { user: any }) {
  const [showPosts, setShowPosts] = useState(false);

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold text-lg">{user.name}</h4>
            <p className="text-sm text-gray-600">@{user.username}</p>
          </div>
          <Badge variant="secondary">ID: {user.id}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4 text-gray-500" />
            <span>{user.website}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{user.address.city}</span>
          </div>
        </div>

        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium">{user.company.name}</p>
          <p className="text-xs text-gray-600">{user.company.catchPhrase}</p>
        </div>

        <Button
          variant={showPosts ? "secondary" : "default"}
          size="sm"
          onClick={() => setShowPosts(!showPosts)}
          className="w-full"
        >
          {showPosts ? "게시물 숨기기" : "게시물 보기"}
        </Button>

        {showPosts && (
          <div className="mt-4 border-t pt-4">
            <UserPosts userId={user.id} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
