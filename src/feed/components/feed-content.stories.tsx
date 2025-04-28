"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import FeedContent from "./feed-content";

const BASE_URL = "https://api.matchreal.shop/api/v1";
const PAGE_SIZE = 20;

// Mock data generators
const generateTags = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    tagId: i + 1,
    tagName: `Tag ${i + 1}`,
  }));

const generateDailyResponse = (id: number) => ({
  dailyId: id,
  userId: id,
  userNickname: `User ${id}`,
});

const generateDailyDetailResponse = (id: number) => ({
  ...generateDailyResponse(id),
  tags: generateTags(Math.floor(Math.random() * 3) + 1),
});

// Image generator with base64 conversion
const generateImageResponse = async () => {
  const response = await fetch("https://picsum.photos/800/600");
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64String = Buffer.from(arrayBuffer).toString("base64");
  return `data:${blob.type};base64,${base64String}`;
};

// MSW handlers creator
const createHandlers = (totalItems = 100) => {
  const dailies = Array.from({ length: totalItems }, (_, i) =>
    generateDailyResponse(i + 1)
  );

  return [
    // GET /daily/all
    http.get(`${BASE_URL}/daily/all`, async ({ request }) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get("page")) || 1; // 1부터 시작하는 페이지네이션
      const size = Number(url.searchParams.get("size")) || PAGE_SIZE;

      const start = (page - 1) * size; // 인덱스 조정
      const end = start + size;
      const pageContent = dailies.slice(start, end);

      return HttpResponse.json({
        currentPage: page,
        isEnd: end >= dailies.length,
        dailies: pageContent,
      });
    }),

    // GET /daily/:id
    http.get(`${BASE_URL}/daily/:id`, ({ params }) => {
      const id = Number(params.id);
      return HttpResponse.json(generateDailyDetailResponse(id));
    }),

    // GET /daily/:id/image
    http.get(`${BASE_URL}/daily/:id/image`, async () => {
      try {
        const response = await fetch("https://picsum.photos/800/600");
        const imageBlob = await response.blob();
        const arrayBuffer = await imageBlob.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");
        const imageUrl = `data:${imageBlob.type};base64,${base64String}`;

        return new HttpResponse(imageBlob, {
          headers: {
            "Content-Type": imageBlob.type,
            "Content-Length": String(imageBlob.size),
          },
        });
      } catch (error) {
        console.error("Failed to generate image:", error);
        return new Response("/placeholder.svg", {
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }
    }),
  ];
};

const meta = {
  title: "Feed/FeedContent",
  component: FeedContent,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: createHandlers(),
    },
  },
} satisfies Meta<typeof FeedContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with 100 items
export const Default: Story = {};

// Story with small dataset (20 items)
export const SmallDataset: Story = {
  parameters: {
    msw: {
      handlers: createHandlers(20),
    },
  },
};

// Story with large dataset (200 items)
export const LargeDataset: Story = {
  parameters: {
    msw: {
      handlers: createHandlers(200),
    },
  },
};
