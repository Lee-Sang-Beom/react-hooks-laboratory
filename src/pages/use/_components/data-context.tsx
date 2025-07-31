"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { User } from "../types";
import { fetchUsers, fetchPosts } from "@/pages/use/hooks/api.ts";

interface DataContextType {
  usersPromise: Promise<User[]>;
  refreshUsers: () => void;
  refreshKey: number;
  getPostsPromise: (userId: number) => Promise<any[]>;
}

const DataContext = createContext<DataContextType | null>(null);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  // Promise를 캐시하여 재사용 - useMemo로 안정화
  const usersPromise = useMemo(() => fetchUsers(), [refreshKey]);

  // Posts Promise 캐시 - userId별로 관리 (Map을 직접 상태로)
  const [postsPromiseCache] = useState(() => new Map<number, Promise<any[]>>());

  const refreshUsers = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
    // Posts 캐시도 초기화
    postsPromiseCache.clear();
  }, [postsPromiseCache]);

  const getPostsPromise = useCallback(
    (userId: number) => {
      // 이미 캐시된 Promise가 있으면 재사용
      if (postsPromiseCache.has(userId)) {
        return postsPromiseCache.get(userId)!;
      }

      // 새로운 Promise 생성 및 캐시
      const promise = fetchPosts(userId);
      postsPromiseCache.set(userId, promise);
      return promise;
    },
    [postsPromiseCache],
  );

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

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}
