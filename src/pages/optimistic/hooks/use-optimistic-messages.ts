import { useOptimistic, useState, useTransition } from "react";
import { addMessageAPI } from "../utils/api";
import type { Message } from "@/pages/optimistic/types";

export const useOptimisticMessages = (initialMessages: Message[]) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        id: Date.now(),
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        status: "sending" as const,
      },
    ],
  );

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageToSend = newMessage;
    setNewMessage("");

    startTransition(async () => {
      addOptimisticMessage(messageToSend);

      try {
        const sentMessage = await addMessageAPI(messageToSend);
        setMessages((prev) => [...prev, sentMessage]);
      } catch (error) {
        console.error("메시지 전송 실패:", error);
      }
    });
  };

  return {
    optimisticMessages,
    newMessage,
    setNewMessage,
    isPending,
    handleSendMessage,
  };
};
