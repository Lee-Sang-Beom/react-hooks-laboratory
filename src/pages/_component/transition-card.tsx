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
export default function TransitionCard({ handleCardClick }: Props) {
  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-green-200 group"
      onClick={() => handleCardClick("/use-transition")}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <Badge variant="secondary" className="text-xs">
              React 18+
            </Badge>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-colors" />
        </div>
        <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-green-700 transition-colors">
          useTransition
        </CardTitle>
        <CardDescription className="text-sm text-slate-600 leading-relaxed">
          무거운 업데이트를 백그라운드에서 처리하여 UI 블로킹을 방지합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              Non-blocking
            </Badge>
            <Badge variant="outline" className="text-xs">
              Background Processing
            </Badge>
            <Badge variant="outline" className="text-xs">
              Performance
            </Badge>
          </div>
          <p className="text-sm text-slate-500">
            무거운 상태 업데이트를 transition으로 마킹하여 사용자 인터랙션의
            우선순위를 높이고 더 반응성 있는 UI를 구현하는 방법을 배워보세요.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 group-hover:bg-green-50 group-hover:text-green-700"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            학습하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
