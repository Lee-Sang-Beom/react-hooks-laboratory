export type Message = {
  id: number;
  text: string;
  timestamp: string;
  status: "sending" | "sent" | "failed";
};

export type Post = {
  id: number;
  title: string;
  content: string;
  likes: number;
  isLiking?: boolean;
};
