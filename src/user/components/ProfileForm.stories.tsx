import type { Meta, StoryObj } from "@storybook/react";
import { ProfileForm } from "./ProfileForm";
import { expect, userEvent, within } from "@storybook/test";

const PROFILE_IMAGE_URL =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop&auto=format";

const meta: Meta<typeof ProfileForm> = {
  title: "User/ProfileForm",
  component: ProfileForm,
  tags: ["autodocs"],
  argTypes: {
    initialData: {
      control: "object",
      description: "Initial form data",
    },
    onSave: {
      action: "saved",
      description: "Callback when form is saved",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileForm>;

export const Default: Story = {
  args: {},
};

export const WithInitialData: Story = {
  args: {
    initialData: {
      nickname: "홍길동",
      introduction:
        "안녕하세요. 저는 홍길동입니다. 하루를 마무리하면서 노을을 보는 것을 좋아합니다.",
      profileImageUrl: PROFILE_IMAGE_URL,
    },
  },
};

export const WithLongText: Story = {
  args: {
    initialData: {
      nickname: "김철수",
      introduction:
        "안녕하세요. 저는 김철수입니다. 제 취미는 독서와 여행입니다. 특히 자연 속에서 시간을 보내는 것을 좋아합니다. 주말에는 가족과 함께 등산을 자주 다니고, 휴가 때는 해외여행을 즐깁니다. 최근에는 일본의 작은 마을들을 여행하며 현지 문화를 체험하는 것을 좋아합니다. 앞으로도 다양한 경험을 통해 삶을 풍요롭게 만들고 싶습니다.",
      profileImageUrl: PROFILE_IMAGE_URL,
    },
  },
};

export const BasicInput: Story = {
  args: {
    initialData: {
      nickname: "",
      introduction: "",
      profileImageUrl: PROFILE_IMAGE_URL,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 이미지 테스트
    const profileImage = canvas.getByRole("img", { name: "프로필 이미지" });
    expect(profileImage).toHaveAttribute(
      "src",
      args.initialData?.profileImageUrl
    );

    // Test nickname input
    const nicknameInput = canvas.getByLabelText("이름");
    await userEvent.type(nicknameInput, "테스트");
    expect(nicknameInput).toHaveValue("테스트");
    expect(
      canvas.getByText((content, element) => {
        return element?.textContent === "3/20";
      })
    ).toBeInTheDocument();

    // Test introduction input
    const introInput = canvas.getByLabelText("자기 소개");
    await userEvent.type(introInput, "테스트 소개");
    expect(introInput).toHaveValue("테스트 소개");
    expect(
      canvas.getByText((content, element) => {
        return element?.textContent === "6/200";
      })
    ).toBeInTheDocument();

    // Wait for debounce and verify save callback
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(args.onSave).toHaveBeenCalledWith({
      nickname: "테스트",
      introduction: "테스트 소개",
    });
  },
};

export const WithoutImage: Story = {
  args: {
    initialData: {
      nickname: "",
      introduction: "",
      profileImageUrl: "",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // fallback div가 렌더링되는지 확인
    const fallbackDiv = canvas.getByTestId("profile-fallback");
    expect(fallbackDiv).toBeInTheDocument();
  },
};

export const MaxLengthInput: Story = {
  args: {
    initialData: {
      nickname: "",
      introduction: "",
      profileImageUrl: PROFILE_IMAGE_URL,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test max length for nickname
    const nicknameInput = canvas.getByLabelText("이름");
    await userEvent.type(nicknameInput, "a".repeat(25));
    expect(nicknameInput).toHaveValue("a".repeat(20));
    expect(
      canvas.getByText((content, element) => {
        return element?.textContent === "20/20";
      })
    ).toBeInTheDocument();

    // Test max length for introduction
    const introInput = canvas.getByLabelText("자기 소개");
    await userEvent.type(introInput, "a".repeat(250));
    expect(introInput).toHaveValue("a".repeat(200));
    expect(
      canvas.getByText((content, element) => {
        return element?.textContent === "200/200";
      })
    ).toBeInTheDocument();

    // Wait for debounce and verify save callback
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(args.onSave).toHaveBeenCalledWith({
      nickname: "a".repeat(20),
      introduction: "a".repeat(200),
    });
  },
};
