import type { Message, Post } from "@/pages/optimistic/types";

export const initialMessages: Message[] = [
  { id: 1, text: "안녕하세요!", timestamp: "10:30:15", status: "sent" },
  {
    id: 2,
    text: "useOptimistic 공부중입니다",
    timestamp: "10:30:32",
    status: "sent",
  },
];

export const initialPosts: Post[] = [
  {
    id: 1,
    title: "React useOptimistic Hook",
    content: "useOptimistic은 사용자 경험을 향상시키는 훌륭한 Hook입니다.",
    likes: 5,
  },
  {
    id: 2,
    title: "Optimistic UI 패턴",
    content: "비동기 작업의 결과를 기다리지 않고 UI를 먼저 업데이트합니다.",
    likes: 12,
  },
];
