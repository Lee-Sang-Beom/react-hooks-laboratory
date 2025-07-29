import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MessageChat } from "./_components/message-chat";
import { LikeSystem } from "./_components/like-system";
import { CodeExample } from "./_components/code-example";
import { useOptimisticMessages } from "./hooks/use-optimistic-messages";
import {
  initialMessages,
  initialPosts,
} from "@/pages/optimistic/data/mock-data.ts";
import { useOptimisticLikes } from "@/pages/optimistic/hooks/use-optimistic-likes.ts";

export default function OptimisticPage() {
  const navigator = useNavigate();

  const {
    optimisticMessages,
    newMessage,
    setNewMessage,
    isPending: isMessagePending,
    handleSendMessage,
  } = useOptimisticMessages(initialMessages);

  const { optimisticPosts, handleLikePost } = useOptimisticLikes(initialPosts);

  const handleGoBack = () => {
    navigator("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={handleGoBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            useOptimistic Hook
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            React의 useOptimistic Hook을 사용하여 낙관적 업데이트 패턴을
            구현해보세요.
          </p>
        </div>

        {/* 설명 카드 */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-blue-900">useOptimistic이란?</AlertTitle>
          <AlertDescription className="text-blue-800">
            사용자가 액션을 수행할 때 서버 응답을 기다리지 않고 즉시 UI를
            업데이트하여 더 반응성 있는 사용자 경험을 제공하는 Hook입니다. 만약
            서버 요청이 실패하면 자동으로 이전 상태로 되돌립니다.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MessageChat
            messages={optimisticMessages}
            newMessage={newMessage}
            onMessageChange={setNewMessage}
            onSendMessage={handleSendMessage}
            isPending={isMessagePending}
          />

          <LikeSystem posts={optimisticPosts} onLikePost={handleLikePost} />
        </div>

        <CodeExample />
      </div>
    </div>
  );
}
