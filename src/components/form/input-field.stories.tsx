import { Meta, StoryObj } from "@storybook/react";
import { FieldError } from "react-hook-form";
import { InputField } from "@/components/form";
import { AppProvider } from  "@/providers/app";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  decorators: [
    Story => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Name",
  },
};

const error: FieldError = {
  type: "custom",
  message: "Invalid input",
}

export const WithError: Story = {
  args: {
    label: "Name",
    error: error,
  },
};