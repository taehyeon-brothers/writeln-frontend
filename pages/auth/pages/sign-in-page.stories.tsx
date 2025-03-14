import type { Meta, StoryObj } from "@storybook/react";
import SignInPage from "./sign-in-page";

// 환경 변수 모킹
if (typeof window !== "undefined") {
  window.process = {
    ...window.process,
    env: {
      ...window.process?.env,
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: "mock-client-id",
      NEXT_PUBLIC_GOOGLE_OAUTH_URI:
        "https://accounts.google.com/o/oauth2/v2/auth",
    },
  };
}

const meta: Meta<typeof SignInPage> = {
  title: "Pages/SignInPage",
  component: SignInPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SignInPage>;

export const Default: Story = {};

// 다크 모드 버전 (옵션)
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
