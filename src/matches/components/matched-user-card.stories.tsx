import type { Meta, StoryObj } from "@storybook/react";
import { MatchedUserCard } from "./matched-user-card";

const meta: Meta<typeof MatchedUserCard> = {
  title: "Matches/MatchedUserCard",
  component: MatchedUserCard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MatchedUserCard>;

export const Default: Story = {
  args: {
    userId: 1,
    nickname: "김철수",
    age: 25,
    gender: "MALE",
    introduction:
      "안녕하세요! 저는 여행과 사진을 좋아하는 김철수입니다. 새로운 사람들과의 만남을 기대합니다!",
    profileImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    tags: ["여행", "사진", "커피", "독서"],
    openChatUrl: "https://open.kakao.com/o/example",
  },
};

export const WithoutOptionalFields: Story = {
  args: {
    userId: 2,
    nickname: "이영희",
    tags: ["음악", "영화"],
  },
};

export const WithLongIntroduction: Story = {
  args: {
    userId: 3,
    nickname: "박민수",
    age: 30,
    gender: "MALE",
    introduction:
      "안녕하세요! 저는 개발자로 일하고 있는 박민수입니다. 주로 웹 개발을 하고 있으며, 최근에는 React와 TypeScript에 관심이 많습니다. 여가 시간에는 독서와 운동을 즐기며, 주말에는 새로운 카페를 찾아다니는 것을 좋아합니다. 새로운 사람들과의 만남을 통해 서로의 경험을 공유하고 성장하는 것을 좋아합니다.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000",
    tags: ["개발", "React", "TypeScript", "독서", "운동", "카페"],
    openChatUrl: "https://open.kakao.com/o/example2",
  },
};

export const WithManyTags: Story = {
  args: {
    userId: 4,
    nickname: "최지은",
    age: 28,
    gender: "FEMALE",
    introduction: "안녕하세요! 최지은입니다.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
    tags: [
      "음악",
      "영화",
      "여행",
      "독서",
      "요리",
      "사진",
      "운동",
      "코딩",
      "디자인",
      "글쓰기",
    ],
  },
};
