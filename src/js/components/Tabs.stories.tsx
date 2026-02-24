import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import Tabs from "./Tabs";

const meta = {
    component: Tabs,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tabs: [{
            label: "Lorem ipsum",
            value: "tab_one"
        }, {
            label: "Lorem ipsum",
            value: "tab_two"
        }, {
            label: "Lorem ipsum",
            value: "tab_three"
        }],
        value: "tab_one",
        onChange: fn()
    },
    render: (args) => {
        const [value, setValue] = useState(args.value);

        return (
            <Tabs
                {...args}
                onChange={setValue}
                value={value}
            />
        )
    }
}