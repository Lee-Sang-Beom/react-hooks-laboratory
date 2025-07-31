// types.ts
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

/**
 * DataContext에서 제공하는 데이터와 메서드들의 타입 정의
 * - Promise 기반의 비동기 데이터 관리를 위한 인터페이스
 */
export interface DataContextType {
  usersPromise: Promise<User[]> /* 사용자 목록을 가져오는 Promise */;
  refreshUsers: () => void /* 사용자 데이터를 새로고침하는 함수 */;
  refreshKey: number /* 데이터 새로고침을 위한 키값 */;
  getPostsPromise: (
    userId: number,
  ) => Promise<any[]> /* 특정 사용자의 게시글을 가져오는 함수 */;
}
