"use client";
import { createContext, useContext } from "react";
import type { DataContextType } from "@/pages/use/types";

/**
 * 전역 데이터 상태를 관리하기 위한 Context 생성
 * - null로 초기화하여 Provider 외부에서 사용시 에러 발생하도록 설계
 */
export const DataContext = createContext<DataContextType | null>(null);

/**
 * DataContext를 안전하게 사용하기 위한 커스텀 Hook
 *
 * Provider 외부에서 사용시 명확한 에러 메시지와 함께 오류 발생
 * - 개발자가 실수로 Provider 외부에서 사용하는 것을 방지
 *
 * @returns DataContext의 값들
 * @throws Error - Provider 외부에서 사용시 에러 발생
 */
export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}
