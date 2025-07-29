import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, Send } from "lucide-react";
import type { Message } from "@/pages/optimistic/types";
import type { KeyboardEvent } from "react";

interface MessageChatProps {
  messages: Message[];
  newMessage: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  isPending: boolean;
}

export const MessageChat = ({
  messages,
  newMessage,
  onMessageChange,
  onSendMessage,
  isPending,
}: MessageChatProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const disabled = isPending || !newMessage.trim();
    if (e.key === "Enter" && !disabled) {
      e.preventDefault(); // 폼 제출 방지
      onSendMessage();
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span>실시간 메시지</span>
        </CardTitle>
        <CardDescription>
          메시지를 전송할 때 즉시 UI에 표시되는 낙관적 업데이트를 경험해보세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 max-h-64 overflow-y-auto bg-slate-50 p-4 rounded-lg">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-2">
              <div
                className={`flex-1 p-3 rounded-lg ${
                  message.status === "sending"
                    ? "bg-blue-100 border border-blue-200"
                    : "bg-white border"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-500">
                    {message.timestamp}
                  </span>
                  <div className="flex items-center space-x-1">
                    {message.status === "sending" && (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                        <Badge variant="secondary" className="text-xs">
                          전송 중
                        </Badge>
                      </>
                    )}
                    {message.status === "sent" && (
                      <Badge variant="default" className="text-xs bg-green-500">
                        전송됨
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="메시지를 입력하세요..."
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={onSendMessage}
            disabled={isPending || !newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
