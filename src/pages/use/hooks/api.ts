// api.ts
import type { User, Post, Comment } from "../types";

// 'use server' - 서버에서 실행되는 함수들 (실제로는 클라이언트에서 실행되지만 개념 시연)
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

export async function fetchUserWithPosts(
  userId: number,
): Promise<{ user: User; posts: Post[] }> {
  // 병렬로 사용자 정보와 게시물을 가져오기
  const [usersResponse, postsResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
  ]);

  if (!usersResponse.ok || !postsResponse.ok) {
    throw new Error("Failed to fetch user data");
  }

  const [user, posts] = await Promise.all([
    usersResponse.json(),
    postsResponse.json(),
  ]);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return { user, posts };
}
