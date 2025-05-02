import type { Meta, StoryObj } from "@storybook/react";
import { MatchedUsersSlider } from "./matched-users-slider";

const meta: Meta<typeof MatchedUsersSlider> = {
  title: "Matches/MatchedUsersSlider",
  component: MatchedUsersSlider,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MatchedUsersSlider>;

const sampleUsers = [
  {
    userId: 1,
    nickname: "김철수",
    age: 25,
    gender: "MALE" as const,
    introduction:
      "안녕하세요! 저는 여행과 사진을 좋아하는 김철수입니다. 새로운 사람들과의 만남을 기대합니다!",
    profileImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    tags: ["여행", "사진", "커피", "독서"],
    openChatUrl: "https://open.kakao.com/o/example",
  },
  {
    userId: 2,
    nickname: "이영희",
    age: 28,
    gender: "FEMALE" as const,
    introduction: "안녕하세요! 이영희입니다. 음악과 영화를 좋아해요.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
    tags: ["음악", "영화", "독서"],
  },
  {
    userId: 3,
    nickname: "박민수",
    age: 30,
    gender: "MALE" as const,
    introduction:
      "안녕하세요! 저는 개발자로 일하고 있는 박민수입니다. 주로 웹 개발을 하고 있으며, 최근에는 React와 TypeScript에 관심이 많습니다.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000",
    tags: ["개발", "React", "TypeScript", "독서", "운동", "카페"],
    openChatUrl: "https://open.kakao.com/o/example2",
  },
];

export const Default: Story = {
  args: {
    users: sampleUsers,
  },
};

export const SingleUser: Story = {
  args: {
    users: [sampleUsers[0]],
  },
};

export const Empty: Story = {
  args: {
    users: [],
  },
};
