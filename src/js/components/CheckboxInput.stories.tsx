import type { Meta, StoryObj } from "@storybook/react-vite";
import CheckboxInput from "./CheckboxInput";

const meta = {
    component: CheckboxInput,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof CheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Lorem ipsum"
    }
}

export const Error: Story = {
    args: {
        error: "Error message",
        children: "Lorem ipsum"
    }
}