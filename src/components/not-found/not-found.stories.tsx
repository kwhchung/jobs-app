import { Meta, StoryObj } from '@storybook/react';
import { NotFound } from './not-found';
import { AppProvider } from "@/providers/app";

const meta: Meta = {
  title: 'Components/NotFound',
  component: NotFound,
  decorators: [
    Story => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NotFound>;

export const Default: Story = {};
