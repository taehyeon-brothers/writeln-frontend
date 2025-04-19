import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import { expect, waitFor, within } from "@storybook/test";
import ProfileEditPage from "./profile-edit-page";

const TAYLOR_SWIFT_PROFILE = {
  nickname: "Taylor Swift",
  introduction: "하루를 마무리하면서 노을을 보는 것을 좋아합니다.",
  profileImageUrl:
    "https://i.scdn.co/image/ab6761610000e5eb9e690225ad4445530612ccc9",
};

const meta = {
  title: "User/ProfileEditPage",
  component: ProfileEditPage,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        http.get("https://api.matchreal.shop/api/v1/users/me", () => {
          return HttpResponse.json(TAYLOR_SWIFT_PROFILE);
        }),
        http.patch("https://api.matchreal.shop/api/v1/users", () => {
          return new HttpResponse(null, { status: 200 });
        }),
      ],
    },
  },
} satisfies Meta<typeof ProfileEditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 프로필 데이터가 로드되었는지 확인
    await waitFor(
      () => {
        const nicknameInput = canvas.getByRole("textbox", {
          name: /이름/i,
        });
        expect(nicknameInput).toHaveValue(TAYLOR_SWIFT_PROFILE.nickname);
      },
      { timeout: 1000 }
    );

    const introductionTextarea = await canvas.findByRole("textbox", {
      name: /자기 소개/i,
    });
    expect(introductionTextarea).toHaveValue(TAYLOR_SWIFT_PROFILE.introduction);
  },
};

// TODO fix msw to pass this test
export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.matchreal.shop/api/v1/users/me", () => {
          return new Promise(() => {});
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 로딩 상태 확인
    const loadingElement = await canvas.findByRole("status");
    expect(loadingElement).toHaveTextContent("로딩 중...");
  },
};

// TODO fix msw to pass this test
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.matchreal.shop/api/v1/users/me", () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 에러 메시지 확인
    const errorMessage = await canvas.findByRole("alert");
    expect(errorMessage).toHaveTextContent(
      "프로필을 불러오는 중 오류가 발생했습니다."
    );
  },
};
