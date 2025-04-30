import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { createContext, useContext, useEffect, useState } from "react";
import Footer from "./footer";

// 1. Context 생성
const FooterContext = createContext<{
  activeTab: "home" | "matches" | "profile";
  setActiveTab: (tab: "home" | "matches" | "profile") => void;
}>(null!);

// 2. Context Provider 컴포넌트
const FooterProvider = ({
  children,
  initialTab = "home",
}: {
  children: React.ReactNode;
  initialTab?: "home" | "matches" | "profile";
}) => {
  const [activeTab, setActiveTab] = useState<"home" | "matches" | "profile">(
    initialTab
  );
  return (
    <FooterContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </FooterContext.Provider>
  );
};

// 3. Footer 컴포넌트 래퍼
const FooterWithContext = () => {
  const { activeTab, setActiveTab } = useContext(FooterContext);
  return <Footer activeTab={activeTab} onTabChange={setActiveTab} />;
};

// 4. TestWrapper 컴포넌트
const TestWrapper = ({
  children,
  onStateChange,
}: {
  children: React.ReactNode;
  onStateChange: (state: { activeTab: string }) => void;
}) => {
  const { activeTab } = useContext(FooterContext);

  useEffect(() => {
    onStateChange({ activeTab });
  }, [activeTab, onStateChange]);

  return children;
};

// 5. 상태 추적기
const stateTracker = {
  changes: [] as { activeTab: string }[],
  addChange: (state: { activeTab: string }) => {
    stateTracker.changes.push(state);
  },
  reset: () => {
    stateTracker.changes = [];
  },
};

const meta = {
  title: "Base/Footer",
  component: FooterWithContext,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <FooterProvider initialTab="home">
        <Story />
      </FooterProvider>
    ),
  ],
  argTypes: {
    initialTab: {
      control: "select",
      options: ["home", "messages", "profile"],
    },
  },
} satisfies Meta<typeof FooterWithContext>;

export default meta;
type FooterStory = StoryObj<typeof meta> & {
  args: {
    initialTab: "home" | "messages" | "profile";
  };
};

export const Default: FooterStory = {
  args: {
    initialTab: "home",
  },
};

export const WithInteraction: FooterStory = {
  args: {
    initialTab: "home",
  },
  decorators: [
    (Story) => {
      stateTracker.reset();
      return (
        <TestWrapper onStateChange={stateTracker.addChange}>
          <Story />
        </TestWrapper>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeButton = canvas.getByRole("button", { name: "Home" });
    const messagesButton = canvas.getByRole("button", { name: "Messages" });
    const profileButton = canvas.getByRole("button", { name: "Profile" });

    // 초기 상태 확인
    expect(stateTracker.changes[0].activeTab).toBe("home");

    // messages 탭 클릭
    await userEvent.click(messagesButton);
    expect(
      stateTracker.changes[stateTracker.changes.length - 1].activeTab
    ).toBe("messages");

    // profile 탭 클릭
    await userEvent.click(profileButton);
    expect(
      stateTracker.changes[stateTracker.changes.length - 1].activeTab
    ).toBe("profile");

    // home 탭 클릭
    await userEvent.click(homeButton);
    expect(
      stateTracker.changes[stateTracker.changes.length - 1].activeTab
    ).toBe("home");
  },
};

export const MessagesActive: FooterStory = {
  args: {
    initialTab: "messages",
  },
};

export const ProfileActive: FooterStory = {
  args: {
    initialTab: "profile",
  },
};
