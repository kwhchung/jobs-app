import { Meta, StoryObj } from "@storybook/react";
import { CiSquarePlus } from "react-icons/ci";
import { Button } from "@/components/button";
import { AppProvider } from "@/providers/app";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  decorators: [
    Story => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click Me",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Click Me",
    icon: <CiSquarePlus />,
  },
};