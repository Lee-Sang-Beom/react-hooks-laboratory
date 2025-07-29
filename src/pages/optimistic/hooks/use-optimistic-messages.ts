import { useOptimistic, useState, useTransition } from "react";
import { addMessageAPI } from "../utils/api";
import type { Message } from "@/pages/optimistic/types";

export const useOptimisticMessages = (initialMessages: Message[]) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    getTempMessages,
  );

  /**
   * Optimistic UI를 위한 임시 메시지 생성 함수
   *
   * @description 실제 API 요청이 완료되고 messages가 업데이트되기 전까지 UI에 임시로 표시할 메시지를 생성합니다.
   *              실제 messages 상태가 업데이트되면 여기서 생성되어 return된 임시 데이터는 사라집니다.
   *              즉,새로운 messages 객체의 데이터를 모두 덮어쓰게됩니다.
   *
   * @param {Message[]} state - 현재 실제 메시지 배열 (서버에서 확인된 데이터)
   * @param {string} newMessage - 사용자가 입력한 새로운 메시지 텍스트
   *
   * @returns {Message[]} 기존 메시지 + 임시 전송중 메시지가 포함된 새로운 배열
   *
   * @example
   * // 사용자가 "안녕하세요" 입력 시
   * // state: [{id: 1, text: "이전메시지", status: "sent"}]
   * // newMessage: "안녕하세요"
   * // return: [
   * //   {id: 1, text: "이전메시지", status: "sent"},
   * //   {id: 1699123456789, text: "안녕하세요", status: "sending"}
   * // ]
   */
  function getTempMessages(state: Message[], newMessage: string) {
    return [
      ...state,
      {
        id: Date.now(),
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        status: "sending" as const,
      },
    ];
  }

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
