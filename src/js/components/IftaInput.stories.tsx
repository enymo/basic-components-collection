import type { Meta, StoryObj } from "@storybook/react-vite";
import IftaInput from "./IftaInput";

const meta = {
    component: IftaInput,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof IftaInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Label",
        placeholder: "Lorem ipsum",
    }
}

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    }
}

export const Error: Story = {
    args: {
        ...Default.args,
        error: "Error message"
    }
}

export const Choices: Story = {
    args: {
        ...Default.args,
        type: "select",
        choices: [{
            label: "Choice 1",
            value: "choice_one"
        }, {
            label: "Choice 2",
            value: "choice_two"
        }, {
            label: "Choice 3",
            value: "choice_three"
        }]
    }
}