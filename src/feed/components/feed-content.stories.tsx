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

const meta = {
  title: "Feed/FeedContent",
  component: FeedContent,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        // 기본 데이터 (2개)
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/daily/all`,
          ({ request }) => {
            const url = new URL(request.url);
            const page = parseInt(url.searchParams.get("page") || "1");

            if (page === 1) {
              return HttpResponse.json({
                dailies: Array.from({ length: 2 }, (_, i) =>
                  generateMockDaily(1, i)
                ),
                currentPage: 1,
                isEnd: true,
              });
            }

            return HttpResponse.json({
              dailies: [],
              currentPage: page,
              isEnd: true,
            });
          }
        ),
        // 상세 정보
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/daily/:dailyId`,
          ({ params }) => {
            const dailyId = Number(params.dailyId);
            return HttpResponse.json(generateMockDailyDetail(dailyId));
          }
        ),
        // 이미지
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/daily/:dailyId/image`,
          async ({ params }) => {
            const dailyId = Number(params.dailyId);
            const imageUrl = `https://picsum.photos/seed/${dailyId}/800/600`;

            const response = await fetch(imageUrl);
            const blob = await response.blob();

            return new HttpResponse(blob, {
              headers: {
                "Content-Type": "image/jpeg",
              },
            });
          }
        ),
      ],
    },
  },
} satisfies Meta<typeof FeedContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (2개 데이터)
export const Default: Story = {};

// 20개 데이터
export const MediumDataSet: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/daily/all`,
          ({ request }) => {
            const url = new URL(request.url);
            const page = parseInt(url.searchParams.get("page") || "1");
            const isLastPage = page >= 2;

            return HttpResponse.json({
              dailies: Array.from({ length: 10 }, (_, i) =>
                generateMockDaily(page, i)
              ),
              currentPage: page,
              isEnd: isLastPage,
            });
          }
        ),
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/daily/:dailyId`,
          ({ params }) => {
            const dailyId = Number(params.dailyId);
            return HttpResponse.json(generateMockDailyDetail(dailyId));
          }
        ),
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/daily/:dailyId/image`,
          async ({ params }) => {
            const dailyId = Number(params.dailyId);
            const imageUrl = `https://picsum.photos/seed/${dailyId}/800/600`;

            const response = await fetch(imageUrl);
            const blob = await response.blob();

            return new HttpResponse(blob, {
              headers: {
                "Content-Type": "image/jpeg",
              },
            });
          }
        ),
      ],
    },
  },
};

// 100개 데이터
export const LargeDataSet: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/daily/all`,
          ({ request }) => {
            const url = new URL(request.url);
            const page = parseInt(url.searchParams.get("page") || "1");
            const isLastPage = page >= 10;

            return HttpResponse.json({
              dailies: Array.from({ length: 10 }, (_, i) =>
                generateMockDaily(page, i)
              ),
              currentPage: page,
              isEnd: isLastPage,
            });
          }
        ),
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/daily/:dailyId`,
          ({ params }) => {
            const dailyId = Number(params.dailyId);
            return HttpResponse.json(generateMockDailyDetail(dailyId));
          }
        ),
        http.get(
          `${process.env.NEXT_PUBLIC_API_URL}/daily/:dailyId/image`,
          async ({ params }) => {
            const dailyId = Number(params.dailyId);
            const imageUrl = `https://picsum.photos/seed/${dailyId}/800/600`;

            const response = await fetch(imageUrl);
            const blob = await response.blob();

            return new HttpResponse(blob, {
              headers: {
                "Content-Type": "image/jpeg",
              },
            });
          }
        ),
      ],
    },
  },
};
