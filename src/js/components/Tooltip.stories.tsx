import type { Meta, StoryObj } from "@storybook/react-vite";
import CircleQuestion from "../../svg/circle-question-regular-full.svg?react";
import Tooltip from "./Tooltip";

const meta = {
    component: Tooltip,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [Story => (
        <div className="h-svh flex flex-col items-end justify-start overflow-hidden">
            <Story />
        </div>
    )]
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tooltip: "Lorem ipsum",
        children: <CircleQuestion className="fill-neutral-300 size-4" />
    }
}