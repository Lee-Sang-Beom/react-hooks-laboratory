import { Loader2 } from "lucide-react";

export const PostsLoading = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        게시물을 불러오는 중...
      </div>
    </div>
  );
};

export const CommentsLoading = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <Loader2 className="w-3 h-3 animate-spin" />
        댓글을 불러오는 중...
      </div>
    </div>
  );
};

export const UserListLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
      <p className="text-gray-600">
        JSONPlaceholder API에서 사용자 데이터를 가져오는 중...
      </p>
      <p className="text-sm text-gray-500 mt-2">
        use() Hook이 Promise를 처리하고 있습니다
      </p>
    </div>
  );
};
