import { Meta, StoryObj } from "@storybook/react";
import { CiSquarePlus } from "react-icons/ci";
import { Link } from "@/components/link";
import { AppProvider } from "@/providers/app";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  decorators: [
    Story => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "/",
    children: "Click Me",
  },
};

export const WithIcon: Story = {
  args: {
    href: "/",
    children: "Click Me",
    icon: <CiSquarePlus />,
  },
};