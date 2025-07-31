"use client";
import { use } from "react";

export default function CommentsList({ promise }: { promise: Promise<any[]> }) {
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
