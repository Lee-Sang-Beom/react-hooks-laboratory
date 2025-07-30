import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search } from "lucide-react";
import type { Product } from "@/pages/transition/types";

interface SearchFilterProps {
  products: Product[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch: (term: string) => void;
  isPending: boolean;
}

export function SearchFilter({
  products,
  searchTerm,
  onSearchChange,
  onSearch,
  isPending,
}: SearchFilterProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    onSearch(localSearchTerm); // 디바운싱 없이
  }, [localSearchTerm, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          실시간 검색 필터링
          {isPending && (
            <Loader2 className="w-4 h-4 animate-spin text-green-600" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="제품명, 카테고리, 설명으로 검색..."
            value={localSearchTerm}
            onChange={handleInputChange}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <div className="text-sm text-gray-600 mb-4">
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              검색 중...
            </span>
          ) : (
            `총 ${products.length}개 결과`
          )}
        </div>

        <div className="max-h-96 overflow-y-auto space-y-3">
          {products.slice(0, 1000).map((product) => (
            <div key={product.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">{product.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-green-600">
                  ${product.price}
                </span>
                {product.relevanceScore && (
                  <span className="text-xs text-gray-500">
                    점수: {product.relevanceScore!.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
