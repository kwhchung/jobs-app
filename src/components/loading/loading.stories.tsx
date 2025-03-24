import { Meta, StoryObj } from '@storybook/react';
import { Loading } from './loading';
import { AppProvider } from "@/providers/app";

const meta: Meta = {
  title: 'Components/Loading',
  component: Loading,
  decorators: [
    Story => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {};
