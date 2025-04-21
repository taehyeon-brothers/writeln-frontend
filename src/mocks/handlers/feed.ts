import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker/locale/ko";

// 피드 데이터 생성 함수
const generateFeedData = (count: number, page: number = 0) => {
  const dailies = Array.from({ length: count }, (_, index) => ({
    dailyId: `${page}-${index}`,
    userId: faker.string.uuid(),
    userNickname: faker.person.firstName(),
    imageUrl: faker.image.urlLoremFlickr({
      category: "food",
      width: 600,
      height: 800,
    }),
    createdAt: faker.date.recent({ days: 7 }).toISOString(),
    tags: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      (_, tagIndex) => ({
        tagId: `${page}-${index}-${tagIndex}`,
        tagName: faker.word.noun(),
      })
    ),
  }));

  return {
    dailies,
    currentPage: page,
    isEnd: page >= Math.ceil(count / 10),
    isLoading: false,
  };
};

// 기본 피드 핸들러
export const feedHandlers = [
  // 2개 데이터
  http.get("/api/feed/small", () => {
    return HttpResponse.json(generateFeedData(2, 0));
  }),

  // 20개 데이터 (페이지당 10개, 2페이지)
  http.get("/api/feed/medium", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "0");
    const isLastPage = page >= 1;

    return HttpResponse.json(generateFeedData(isLastPage ? 10 : 10, page));
  }),

  // 100개 데이터 (페이지당 10개, 10페이지)
  http.get("/api/feed/large", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "0");
    const isLastPage = page >= 9;

    return HttpResponse.json(generateFeedData(isLastPage ? 10 : 10, page));
  }),
];
