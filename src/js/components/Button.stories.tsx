import { Clickable } from "@enymo/react-clickable";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { sleep } from "../storybook";
import { createButton } from "./Button";

const Button = createButton(Clickable);
const meta = {
    component: Button,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: "primary",
        children: "Button",
        onClick: fn(() => sleep(2000))
    }
}