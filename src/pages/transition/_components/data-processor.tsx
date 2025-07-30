import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Database,
  Loader2,
  Play,
  RotateCcw,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useState } from "react";

interface ProcessedDataItem {
  id: number;
  value: number;
  processed: boolean;
  timestamp: number;
}

interface DataProcessorProps {
  processedData: ProcessedDataItem[];
  isProcessing: boolean;
  onStartProcessing: () => void;
  onReset: () => void;
  useTransitionEnabled: boolean;
  onToggleTransition: () => void;
  progress: number;
}

export function DataProcessor({
  processedData,
  isProcessing,
  onStartProcessing,
  onReset,
  useTransitionEnabled,
  onToggleTransition,
  progress,
}: DataProcessorProps) {
  const [buttonClickCount, setButtonClickCount] = useState(0);

  const handleTestClick = () => {
    setButtonClickCount((prev) => prev + 1);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          데이터 처리 시뮬레이션
          {isProcessing && (
            <Loader2 className="w-4 h-4 animate-spin text-green-600" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* useTransition 토글 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">useTransition 사용</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTransition}
              className="p-0 h-auto"
              disabled={isProcessing}
            >
              {useTransitionEnabled ? (
                <ToggleRight className="w-8 h-8 text-green-600" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-gray-400" />
              )}
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            {useTransitionEnabled ? (
              <span className="text-green-700">
                ✅ ON - UI가 반응성을 유지합니다
              </span>
            ) : (
              <span className="text-red-700 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                OFF - UI가 블로킹됩니다
              </span>
            )}
          </div>
        </div>

        {/* 테스트 버튼들 */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium mb-2">반응성 테스트</div>
          <div className="flex gap-2 mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestClick}
              className="flex-1 transition-all duration-200 hover:scale-105"
            >
              테스트 클릭 ({buttonClickCount})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setButtonClickCount(0)}
              className="flex-1 transition-all duration-200 hover:scale-105"
            >
              초기화
            </Button>
          </div>
          <div className="text-xs text-gray-600">
            처리 중일 때 이 버튼들을 클릭해보세요!
          </div>

          {/* 회전하는 아이콘으로 UI 반응성 시각화 */}
          <div className="mt-3 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-gray-600">
              이 아이콘이 계속 돌아가면 UI가 살아있는 것입니다
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onStartProcessing}
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                처리 중... ({progress}%)
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                무거운 처리 시작 (20K 아이템)
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onReset} disabled={isProcessing}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>처리 진행중...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-500">
              {useTransitionEnabled
                ? "🟢 useTransition 활성화 - UI가 반응성을 유지합니다"
                : "🔴 useTransition 비활성화 - UI가 블로킹됩니다"}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600">
          처리된 데이터: {processedData.length.toLocaleString()}개
        </div>

        {processedData.length > 0 && (
          <div className="max-h-96 overflow-y-auto">
            <div className="text-xs text-gray-500 mb-2">
              처리 결과 미리보기:
            </div>
            <div className="space-y-1">
              {processedData.slice(0, 100).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-xs p-2 bg-gray-50 rounded"
                >
                  <span>ID: {item.id}</span>
                  <span>값: {item.value}</span>
                </div>
              ))}
              {processedData.length > 100 && (
                <div className="text-xs text-gray-500 text-center p-2">
                  ... 그리고 {(processedData.length - 100).toLocaleString()}개
                  더
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
