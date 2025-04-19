import type { Meta, StoryObj } from "@storybook/react";
import ProfileEditPage from "./profile-edit-page";

const meta = {
  title: "User/ProfileEditPage",
  component: ProfileEditPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ProfileEditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
