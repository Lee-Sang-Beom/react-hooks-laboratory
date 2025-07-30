import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ArrowRight, BookOpen, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";

interface Props {
  handleCardClick: (path: string) => void;
}
export default function OptimisticCard({ handleCardClick }: Props) {
  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-blue-200 group"
      onClick={() => handleCardClick("/use-optimistic")}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <Badge variant="secondary" className="text-xs">
              React 18+
            </Badge>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
        </div>
        <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
          useOptimistic
        </CardTitle>
        <CardDescription className="text-sm text-slate-600 leading-relaxed">
          사용자 경험을 향상시키는 낙관적 업데이트 패턴을 학습합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              Optimistic UI
            </Badge>
            <Badge variant="outline" className="text-xs">
              UX Enhancement
            </Badge>
            <Badge variant="outline" className="text-xs">
              State Management
            </Badge>
          </div>
          <p className="text-sm text-slate-500">
            비동기 작업이 완료되기 전에 UI를 먼저 업데이트하여 더 반응성 있는
            사용자 경험을 제공하는 방법을 배워보세요.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 group-hover:bg-blue-50 group-hover:text-blue-700"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            학습하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
