import type { Product } from "@/pages/transition/types";

export const initialProducts: Product[] = Array.from(
  { length: 10000 },
  (_, i) => {
    const categories = [
      "전자제품",
      "의류",
      "도서",
      "스포츠",
      "홈&가든",
      "음식",
      "장난감",
      "자동차",
      "화장품",
      "건강용품",
      "문구용품",
      "악기",
      "캠핑용품",
      "반려동물용품",
      "주방용품",
    ];

    const adjectives = [
      "프리미엄",
      "스마트",
      "편안한",
      "고급",
      "실용적인",
      "혁신적인",
      "클래식",
      "모던",
      "경제적인",
      "친환경",
      "다기능",
      "휴대용",
      "무선",
      "방수",
      "내열",
      "항균",
    ];

    const nouns = [
      "제품",
      "아이템",
      "상품",
      "도구",
      "액세서리",
      "키트",
      "세트",
      "컬렉션",
      "시스템",
      "솔루션",
      "장비",
      "기기",
      "용품",
      "패키지",
      "모델",
      "버전",
    ];

    const category = categories[i % categories.length];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    return {
      id: i + 1,
      name: `${adjective} ${category} ${noun} ${i + 1}`,
      category,
      price: Math.floor(Math.random() * 1000) + 10,
      description: `고품질의 ${adjective.toLowerCase()} ${category.toLowerCase()} ${noun}입니다. 뛰어난 성능과 내구성을 자랑하며, 일상생활에서 유용하게 사용할 수 있습니다. 전문가들이 추천하는 제품으로 만족도가 높습니다.`,
      inStock: Math.random() > 0.1,
      brand: `브랜드${Math.floor(i / 100) + 1}`,
      model: `모델-${String(i).padStart(5, "0")}`,
      tags: [adjective, category, noun, `태그${(i % 20) + 1}`],
    };
  },
);
