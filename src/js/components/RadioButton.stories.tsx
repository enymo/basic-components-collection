import type { Meta, StoryObj } from "@storybook/react-vite";
import RadioButton from "./RadioButton";

const meta = {
    component: RadioButton,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        selected: false,
        disabled: false,
        error: false
    }
}

export const Checked: Story = {
    args: {
        selected: true,
        disabled: false,
        error: false
    }
}

export const Disabled: Story = {
    args: {
        selected: false,
        disabled: true
    }
}

export const DisabledChecked: Story = {
    args: {
        selected: true,
        disabled: true,
        error: false
    }
}

export const Error: Story = {
    args: {
        selected: false,
        disabled: false,
        error: true
    }
}

export const CheckedError: Story = {
    args: {
        selected: true,
        disabled: false,
        error: true
    }
}

export const DisabledError: Story = {
    args: {
        selected: false,
        disabled: true,
        error: true
    }
}

export const CheckedDisabledError: Story = {
    args: {
        selected: true,
        disabled: true,
        error: true
    }
}