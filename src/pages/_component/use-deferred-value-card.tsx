import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";

interface Props {
  handleCardClick: (path: string) => void;
}

export default function UseDeferredValueCard({ handleCardClick }: Props) {
  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-blue-200 group"
      onClick={() => handleCardClick("/use-deferred-value")}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <Badge variant="secondary" className="text-xs">
              React 18+
            </Badge>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
        </div>
        <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
          useDeferredValue
        </CardTitle>
        <CardDescription className="text-sm text-slate-600 leading-relaxed">
          값의 업데이트를 지연시켜 UI 성능을 최적화하는 React 훅을 학습합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              Performance
            </Badge>
            <Badge variant="outline" className="text-xs">
              Debouncing
            </Badge>
            <Badge variant="outline" className="text-xs">
              UI Optimization
            </Badge>
          </div>
          <p className="text-sm text-slate-500">
            급하지 않은 UI 업데이트를 지연시켜 사용자 경험을 개선하고 렌더링
            성능을 최적화하는 방법을 배워보세요.
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
