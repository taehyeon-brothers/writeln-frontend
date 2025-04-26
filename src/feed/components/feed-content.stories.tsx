"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker/locale/ko";
import FeedContent from "./feed-content";

// 피드 데이터 생성 함수
const generateMockDaily = (page: number, index: number) => ({
  dailyId: 1000 + (page * 10 + index),
  userId: faker.string.uuid(),
  userNickname: faker.person.fullName(),
  createdAt: faker.date.recent({ days: 7 }).toISOString(),
});

// 상세 데이터 생성 함수
const generateMockDailyDetail = (dailyId: number) => ({
  dailyId,
  userId: faker.string.uuid(),
  userNickname: faker.person.fullName(),
  createdAt: faker.date.recent({ days: 7 }).toISOString(),
  tags: Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    (_, index) => ({
      tagId: dailyId * 10 + index,
      tagName: faker.helpers.arrayElement([
        "맛있다",
        "행복",
        "일상",
        "맛집",
        "카페",
        "디저트",
        "브런치",
        "야식",
        "건강식",
        "홈쿡",
      ]),
    })
  ),
});

// 이미지를 Base64로 변환하는 유틸리티 함수
async function imageUrlToBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// MSW 핸들러를 위한 이미지 URL 생성 함수
const createImageUrl = (dailyId: number) =>
  `https://picsum.photos/seed/${dailyId}/800/600`;

// 데이터와 이미지를 함께 처리하는 핸들러 생성 함수
const createHandlers = (pageSize: number, maxPages: number) => [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/daily/all`,
    async ({ request }) => {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "1");

      // 페이지가 최대 페이지를 초과하면 빈 결과 반환
      if (page > maxPages) {
        return HttpResponse.json({
          dailies: [],
          currentPage: page,
          isEnd: true,
        });
      }

      const isLastPage = page === maxPages;
      const currentPageSize = isLastPage ? Math.min(pageSize, 10) : pageSize;

      // 기본 데이터 생성
      const dailies = await Promise.all(
        Array.from({ length: currentPageSize }, async (_, i) => {
          const daily = generateMockDaily(page, i);
          const details = generateMockDailyDetail(daily.dailyId);
          const imageUrl = createImageUrl(daily.dailyId);

          try {
            // 이미지를 Base64로 변환
            const base64Image = await imageUrlToBase64(imageUrl);
            return {
              ...daily,
              ...details,
              imageUrl: base64Image,
            };
          } catch (error) {
            console.error(
              `Failed to load image for daily ${daily.dailyId}:`,
              error
            );
            return {
              ...daily,
              ...details,
              imageUrl: "/placeholder.svg",
            };
          }
        })
      );

      return HttpResponse.json({
        dailies,
        currentPage: page,
        isEnd: isLastPage,
      });
    }
  ),
  // picsum.photos 요청을 위한 패스스루 핸들러
  http.get("https://picsum.photos/*", async ({ request }) => {
    return fetch(request);
  }),
];

const meta = {
  title: "Feed/FeedContent",
  component: FeedContent,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: createHandlers(2, 1), // Default: 2개 데이터, 1페이지
    },
  },
} satisfies Meta<typeof FeedContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (2개 데이터)
export const Default: Story = {};

// 20개 데이터 (10개씩 2페이지)
export const MediumDataSet: Story = {
  parameters: {
    msw: {
      handlers: createHandlers(10, 2),
    },
  },
};

// 100개 데이터 (10개씩 10페이지)
export const LargeDataSet: Story = {
  parameters: {
    msw: {
      handlers: createHandlers(10, 10),
    },
  },
};
