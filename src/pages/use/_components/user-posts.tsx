"use client";

import { Suspense, use, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { fetchComments } from "../hooks/api";
import type { Post } from "@/pages/use/types";
import { useDataContext } from "@/pages/use/hooks/use-data-context.ts";
import CommentsList from "@/pages/use/_components/comments-list.tsx";
import {
  CommentsLoading,
  PostsLoading,
} from "@/pages/use/_components/loading.tsx";

interface UserPostsProps {
  userId: number;
}

export function UserPosts({ userId }: UserPostsProps) {
  return (
    <Suspense fallback={<PostsLoading />}>
      <PostsList userId={userId} />
    </Suspense>
  );
}

// 🟢 Posts를 가져오는 컴포넌트 (use() hook 사용)
function PostsList({ userId }: { userId: number }) {
  const { getPostsPromise } = useDataContext();

  // ✨ 컨텍스트에서 캐시된 Promise 사용 - 무한 재요청 방지
  // use() 사용과정에서 pending 시 suspense fallback 보여줌 -> 데이터 받으면 실제 ui 구성한다고 리렌더링 일어남
  // 이 과정에서 캐시를 진행하지않으면 promise객체가 달라서 React가 "새로운 작업"으로 인식
  // 다시 suspend 발생(suspense의 fallback ui가 출력) -> 또 다른 promise 생성 -> 완료 후 또 suspend -> 무한 반복
  // 그래서 무한 네트워크 요청
  const posts = use(getPostsPromise(userId));
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        게시물 ({posts.length}개)
      </h4>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const [showComments, setShowComments] = useState(false);

  // 댓글 Promise를 컴포넌트 레벨에서 캐시
  const [commentsPromise, setCommentsPromise] = useState<Promise<any[]> | null>(
    null,
  );

  const handleToggleComments = () => {
    if (!showComments && !commentsPromise) {
      // 처음 댓글을 보려고 할 때만 Promise 생성 (promise 자체를 저장)
      const commentsPromise = fetchComments(post.id);
      setCommentsPromise(commentsPromise);
    }
    setShowComments(!showComments);
  };

  return (
    <Card className="border border-gray-100">
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h5 className="font-medium text-sm line-clamp-2">{post.title}</h5>
          <Badge variant="outline" className="text-xs">
            #{post.id}
          </Badge>
        </div>

        <p className="text-xs text-gray-600 mb-3 line-clamp-3">{post.body}</p>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleComments}
          className="h-7 px-2 text-xs"
        >
          {showComments ? (
            <>
              <ChevronUp className="w-3 h-3 mr-1" />
              댓글 숨기기
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 mr-1" />
              댓글 보기
            </>
          )}
        </Button>

        {showComments && commentsPromise && (
          <div className="mt-3 border-t pt-3">
            <Suspense fallback={<CommentsLoading />}>
              <CommentsList promise={commentsPromise} />
            </Suspense>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
