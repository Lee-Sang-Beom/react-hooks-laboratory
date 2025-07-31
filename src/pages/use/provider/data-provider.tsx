"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";
import { fetchPosts, fetchUsers } from "@/pages/use/hooks/api.ts";
import type { DataContextType } from "@/pages/use/types";
import { DataContext } from "../hooks/use-data-context.ts";

interface DataProviderProps {
  children: ReactNode;
}

/**
 * 전역 데이터 상태를 제공하는 Provider 컴포넌트
 *
 * 주요 기능:
 * 1. Promise 캐싱을 통한 불필요한 API 호출 방지
 * 2. 사용자별 게시글 데이터 캐싱 관리
 * 3. 데이터 새로고침 기능 제공
 */
export function DataProvider({ children }: DataProviderProps) {
  /**
   * 데이터 새로고침을 위한 키값
   * - 이 값이 변경되면 usersPromise가 재생성됨
   */
  const [refreshKey, setRefreshKey] = useState(0);

  /**
   * 사용자 목록 Promise 캐싱
   * - refreshKey가 변경될 때만 새로운 Promise 생성
   * - useMemo를 통해 불필요한 재생성 방지
   */
  const usersPromise = useMemo(() => fetchUsers(), [refreshKey]);

  /**
   * 게시글 Promise 캐시 저장소
   * - Map<userId, Promise>로 사용자별 게시글 데이터 캐싱
   * - useState로 컴포넌트 생명주기 동안 유지
   */
  const [postsPromiseCache] = useState(() => new Map<number, Promise<any[]>>());

  /**
   * 사용자 데이터 새로고침 함수
   * - refreshKey를 증가시켜 usersPromise 재생성 트리거
   * - 게시글 캐시도 함께 초기화하여 데이터 일관성 보장
   */
  const refreshUsers = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
    /* 사용자 데이터가 변경되면 관련 게시글 캐시도 초기화 */
    postsPromiseCache.clear();
  }, [postsPromiseCache]);

  /**
   * 특정 사용자의 게시글 Promise를 가져오는 함수
   *
   * 캐싱 로직:
   * 1. 이미 캐시된 Promise가 있으면 재사용 (중복 API 호출 방지)
   * 2. 없으면 새로운 Promise 생성하고 캐시에 저장
   *
   * @param userId - 게시글을 가져올 사용자 ID
   * @returns 해당 사용자의 게시글 목록 Promise
   */
  const getPostsPromise = useCallback(
    (userId: number) => {
      /* 캐시에서 기존 Promise 확인 */
      if (postsPromiseCache.has(userId)) {
        return postsPromiseCache.get(userId)!;
      }

      /* 새로운 Promise 생성 및 캐시 저장 */
      const promise = fetchPosts(userId);
      postsPromiseCache.set(userId, promise);
      return promise;
    },
    [postsPromiseCache],
  );

  /**
   * Context에 제공할 값들을 memoization
   * - 의존성이 변경될 때만 새로운 객체 생성
   * - 하위 컴포넌트의 불필요한 리렌더링 방지
   */
  const contextValue: DataContextType = useMemo(
    () => ({
      usersPromise,
      refreshUsers,
      refreshKey,
      getPostsPromise,
    }),
    [usersPromise, refreshUsers, refreshKey, getPostsPromise],
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}
