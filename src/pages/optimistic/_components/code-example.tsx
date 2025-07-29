import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CodeExample = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>코드 예제</CardTitle>
        <CardDescription>위 예제들의 핵심 코드를 확인해보세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            {`// 1. useOptimistic Hook 선언
const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (state, newMessage: string) => [
    ...state,
    {
      id: Date.now(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      status: 'sending'
    }
  ]
);

// 2. 낙관적 업데이트 실행
const handleSendMessage = async () => {
  startTransition(async () => {
    // 즉시 UI 업데이트
    addOptimisticMessage(messageToSend);

    try {
      // 실제 API 호출
      const result = await addMessageAPI(messageToSend);
      setMessages(prev => [...prev, result]);
    } catch (error) {
      // 실패 시 자동으로 이전 상태로 복원
      console.error('전송 실패:', error);
    }
  });
};`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};
