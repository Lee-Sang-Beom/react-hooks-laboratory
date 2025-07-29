import { useOptimistic, useState, useTransition } from "react";
import { likePostAPI } from "../utils/api";
import type { Post } from "@/pages/optimistic/types";

export const useOptimisticLikes = (initialPosts: Post[]) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isPending, startTransition] = useTransition();

  const [optimisticPosts, addOptimisticLike] = useOptimistic(
    posts,
    getTempPosts,
  );

  function getTempPosts(state: Post[], postId: number) {
    return state.map((post) =>
      post.id === postId
        ? { ...post, likes: post.likes + 1, isLiking: true }
        : post,
    );
  }

  const handleLikePost = async (postId: number) => {
    startTransition(async () => {
      addOptimisticLike(postId);

      try {
        await likePostAPI();
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post,
          ),
        );
      } catch (error) {
        console.error("좋아요 실패:", error);
      }
    });
  };

  return {
    optimisticPosts,
    isPending,
    handleLikePost,
  };
};
