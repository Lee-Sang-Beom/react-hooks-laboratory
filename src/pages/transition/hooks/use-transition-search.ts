import { useState, useTransition, useMemo, useCallback } from "react";
import type { Product } from "@/pages/transition/types";

export const useTransitionSearch = (initialProducts: Product[]) => {
  const [products] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [deferredSearchTerm, setDeferredSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  // 실제 필터링 로직 - 의도적으로 무거운 연산 시뮬레이션
  const filteredProducts = useMemo(() => {
    if (!deferredSearchTerm) {
      return products;
    }

    // 무거운 연산 시뮬레이션
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(deferredSearchTerm.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(deferredSearchTerm.toLowerCase()),
    );

    // 추가적인 무거운 연산 시뮬레이션 (정렬 및 점수 계산)
    return filtered
      .map((product) => ({
        ...product,
        relevanceScore: calculateRelevanceScore(product, deferredSearchTerm),
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }, [products, deferredSearchTerm]);

  // startTransition 미사용: 타이핑 → 모든 상태 동시 업데이트 → 무거운 검색 → UI 블로킹
  // startTransition 사용: 타이핑 → 입력만 즉시 반영 → 검색은 나중에 → UI 반응성 유지
  const handleSearch = useCallback(
    (term: string) => {
      startTransition(() => {
        // 이 업데이트는 transition으로 처리되어 UI를 블로킹하지 않습니다
        // 아래 상태 업데이트만 '낮은 우선순위'로 처리
        setDeferredSearchTerm(term);
      });
    },
    [startTransition],
  );

  return {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    isSearchPending: isPending,
    handleSearch,
  };
};

export function calculateRelevanceScore(
  product: Product,
  searchTerm: string,
): number {
  let score = 0;
  const term = searchTerm.toLowerCase();

  if (product.name.toLowerCase().includes(term)) score += 10;
  if (product.category.toLowerCase().includes(term)) score += 5;
  if (product.description.toLowerCase().includes(term)) score += 3;
  if (product.brand?.toLowerCase().includes(term)) score += 8;
  if (product.model?.toLowerCase().includes(term)) score += 6;

  if (product.tags) {
    product.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(term)) score += 2;
    });
  }

  // 가벼운 연산만 (렌더링에 집중)
  score += Math.random() * 0.1;

  return Math.round(score * 100) / 100;
}
