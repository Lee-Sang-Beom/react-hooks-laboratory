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

export default function UseCard({ handleCardClick }: Props) {
  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-yellow-200 group"
      onClick={() => handleCardClick("/use-use")}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
            <Badge variant="secondary" className="text-xs">
              React 19+
            </Badge>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-yellow-600 transition-colors" />
        </div>
        <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-yellow-700 transition-colors">
          use
        </CardTitle>
        <CardDescription className="text-sm text-slate-600 leading-relaxed">
          Promise와 Context를 읽기 위한 새로운 React 19 훅을 학습합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              Promise
            </Badge>
            <Badge variant="outline" className="text-xs">
              Context
            </Badge>
            <Badge variant="outline" className="text-xs">
              Async Data
            </Badge>
          </div>
          <p className="text-sm text-slate-500">
            컴포넌트 내에서 Promise를 읽고 Context를 동적으로 사용할 수 있는
            강력한 새 훅의 사용법을 배워보세요.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 group-hover:bg-yellow-50 group-hover:text-yellow-700"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            학습하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
