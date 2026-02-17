import type { Meta, StoryObj } from "@storybook/react-vite";
import Error from "./Error";

const meta = {
    component: Error,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof Error>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Error message"
    }
}