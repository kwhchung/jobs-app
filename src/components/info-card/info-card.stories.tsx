import { Meta, StoryObj } from '@storybook/react';
import { InfoCard } from './info-card';
import { AppProvider } from "@/providers/app";

const meta: Meta = {
  title: 'Components/InfoCard',
  component: InfoCard,
  decorators: [
    Story => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InfoCard>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    value: 'John Doe',
  },
};
