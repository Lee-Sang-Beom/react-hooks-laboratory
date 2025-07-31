"use client";

import { use, Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { fetchComments } from "../hooks/api";
import { useDataContext } from "./data-context";
import type { Post } from "@/pages/use/types";

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
      // 처음 댓글을 보려고 할 때만 Promise 생성
      setCommentsPromise(fetchComments(post.id));
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

// 🟢 Comments를 가져오는 컴포넌트 (use() hook 사용)
function CommentsList({ promise }: { promise: Promise<any[]> }) {
  // ✨ 미리 생성된 Promise 사용 - 무한 재요청 방지
  const comments = use(promise);

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-gray-700">
        댓글 {comments.length}개
      </div>
      {comments.slice(0, 3).map((comment) => (
        <div key={comment.id} className="p-2 bg-gray-50 rounded text-xs">
          <div className="font-medium mb-1">{comment.name}</div>
          <div className="text-gray-600 text-xs mb-1">{comment.email}</div>
          <div className="text-gray-700 line-clamp-2">{comment.body}</div>
        </div>
      ))}
      {comments.length > 3 && (
        <div className="text-xs text-gray-500 text-center">
          ...그리고 {comments.length - 3}개 더
        </div>
      )}
    </div>
  );
}

function PostsLoading() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        게시물을 불러오는 중...
      </div>
    </div>
  );
}

function CommentsLoading() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <Loader2 className="w-3 h-3 animate-spin" />
        댓글을 불러오는 중...
      </div>
    </div>
  );
}
