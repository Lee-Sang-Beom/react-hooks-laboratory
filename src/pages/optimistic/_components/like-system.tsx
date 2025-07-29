import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, ThumbsUp } from "lucide-react";
import type { Post } from "@/pages/optimistic/types";

interface LikeSystemProps {
  posts: Post[];
  onLikePost: (postId: number) => void;
}

export const LikeSystem = ({ posts, onLikePost }: LikeSystemProps) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ThumbsUp className="w-5 h-5 text-red-600" />
          <span>좋아요 시스템</span>
        </CardTitle>
        <CardDescription>
          좋아요 버튼을 클릭하면 즉시 카운트가 증가하는 것을 확인할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 bg-white">
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <p className="text-slate-600 text-sm mb-3">{post.content}</p>
            <Separator className="my-3" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                {post.likes}명이 좋아합니다
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onLikePost(post.id)}
                disabled={post.isLiking}
                className={post.isLiking ? "bg-red-50 border-red-200" : ""}
              >
                {post.isLiking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    처리 중...
                  </>
                ) : (
                  <>
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    좋아요
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
