import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import Header, { HeaderProps } from "./header";

const meta: Meta<typeof Header> = {
  title: "Base/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Header title text",
    },
    onNotificationClick: {
      action: "notification clicked",
      description: "Callback when notification button is clicked",
    },
    onCameraClick: {
      action: "camera clicked",
      description: "Callback when camera button is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};

export const WithCustomTitle: Story = {
  args: {
    title: "Custom Title",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Custom Title");
    expect(title).toBeInTheDocument();
  },
};
