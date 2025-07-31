import type { User, Post, Comment } from "../types";

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  // 실제 네트워크 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return response.json();
}

export async function fetchPosts(userId: number): Promise<Post[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch posts for user ${userId}`);
  }
  await new Promise((resolve) => setTimeout(resolve, 800));
  return response.json();
}

export async function fetchComments(postId: number): Promise<Comment[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch comments for post ${postId}`);
  }
  await new Promise((resolve) => setTimeout(resolve, 600));
  return response.json();
}
