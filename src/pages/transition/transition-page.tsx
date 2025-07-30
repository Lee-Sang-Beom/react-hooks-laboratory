import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Info, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchFilter } from "./_components/search-filter";
import { DataProcessor } from "./_components/data-processor";
import { CodeExample } from "./_components/code-example";
import { initialProducts } from "@/pages/transition/data/mock-data";
import { useTransitionSearch } from "@/pages/transition/hooks/use-transition-search";
import { useTransitionProcessor } from "@/pages/transition/hooks/use-transition-processor";

export default function TransitionPage() {
  const navigator = useNavigate();

  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    isSearchPending,
    handleSearch,
  } = useTransitionSearch(initialProducts);

  const {
    processedData,
    isProcessing,
    handleStartProcessing,
    handleReset,
    useTransitionEnabled,
    toggleTransition,
    progress,
  } = useTransitionProcessor();

  const handleGoBack = () => {
    navigator("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={handleGoBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            useTransition Hook
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            React의 useTransition Hook을 사용하여 무거운 업데이트를
            백그라운드에서 처리하고 UI 블로킹을 방지하는 방법을 학습해보세요.
          </p>
        </div>

        {/* 설명 카드 */}
        <Alert className="mb-8 border-green-200 bg-green-50">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-green-900">useTransition이란?</AlertTitle>
          <AlertDescription className="text-green-800">
            무거운 상태 업데이트를 transition으로 마킹하여 UI를 블로킹하지 않고
            백그라운드에서 처리할 수 있게 해주는 Hook입니다. 사용자 인터랙션의
            우선순위를 높여 더 반응성 있는 사용자 경험을 제공합니다.
          </AlertDescription>
        </Alert>

        {/* 주의사항 */}
        <Alert className="mb-8 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="text-orange-900">체감 테스트 방법</AlertTitle>
          <AlertDescription className="text-orange-800">
            <strong>useTransition OFF</strong> 상태에서 "무거운 처리 시작"을
            클릭하고 버튼들을 클릭해보세요. UI가 완전히 멈춥니다. 그 다음
            <strong> useTransition ON</strong> 상태에서 같은 작업을 해보면
            버튼들이 여전히 반응하는 것을 확인할 수 있습니다.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SearchFilter
            products={filteredProducts}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearch={handleSearch}
            isPending={isSearchPending}
          />

          <DataProcessor
            processedData={processedData}
            isProcessing={isProcessing}
            onStartProcessing={handleStartProcessing}
            onReset={handleReset}
            useTransitionEnabled={useTransitionEnabled}
            onToggleTransition={toggleTransition}
            progress={progress}
          />
        </div>

        <CodeExample />
      </div>
    </div>
  );
}
