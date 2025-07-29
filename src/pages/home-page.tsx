import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ArrowRight, Zap, BookOpen } from "lucide-react";

export default function HomePage() {
  const navigator = useNavigate();
  const handleCardClick = (path: string) => {
    navigator(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            React Hooks Study
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            React Hook을 학습하고 실습할 수 있는 인터랙티브 가이드입니다.
          </p>
        </div>

        {/* Hook Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* useOptimistic Hook Card */}
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
                  비동기 작업이 완료되기 전에 UI를 먼저 업데이트하여 더 반응성
                  있는 사용자 경험을 제공하는 방법을 배워보세요.
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

          {/* Placeholder Cards for Future Hooks */}
          <Card className="opacity-60 cursor-not-allowed border-dashed">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-gray-200">
                    Coming Soon
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-xl font-semibold text-gray-400">
                useTransition
              </CardTitle>
              <CardDescription className="text-sm text-gray-400">
                준비 중인 컨텐츠입니다.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="opacity-60 cursor-not-allowed border-dashed">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-gray-200">
                    Coming Soon
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-xl font-semibold text-gray-400">
                useDeferredValue
              </CardTitle>
              <CardDescription className="text-sm text-gray-400">
                준비 중인 컨텐츠입니다.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500">
            💡 각 카드를 클릭하여 해당 Hook의 학습 페이지로 이동하세요
          </p>
        </div>
      </div>
    </div>
  );
}
