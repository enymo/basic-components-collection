import type { Meta, StoryObj } from "@storybook/react-vite";
import RadioInput from "./RadioInput";

const meta = {
    component: RadioInput,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof RadioInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Lorem ipsum"
    }
}

export const Error: Story = {
    args: {
        children: "Lorem ipsum",
        error: "Error message"
    }
}