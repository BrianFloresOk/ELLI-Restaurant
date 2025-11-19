import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "."

const meta: Meta<typeof Input> = {
    title: "UI/Input",
    component: Input,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    }
}

export default meta

type Story = StoryObj<typeof Input>


export const EmailInput: Story = {
    args: {
        label: "Email",
        placeholder: "Enter text",
        type: "text",
        size: "medium",
        name: "email"
    },
}

export const PasswordInput: Story = {
    args: {
        label: "Password",
        placeholder: "Enter password",
        type: "password",
        size: "medium",
        name: "password"
    },
}
export const LargeInput: Story = {
    args: {
        label: "Large Input",
        placeholder: "Enter large text",
        type: "text",
        size: "large",
        name: "large-input"
    },
}

export const SmallInput: Story = {
    args: {
        label: "Small Input",
        placeholder: "Enter small text",
        type: "text",
        size: "small",
        name: "small-input"
    },
}

export const SmallInputPassword: Story = {
    args: {
        label: "Small Password Input",
        placeholder: "Enter small password",
        type: "password",
        size: "small",
        name: "small-password-input"
    },
}

export const ErrorState: Story = {
    args: {
        label: "Email",
        placeholder: "Enter your email",
        type: "email",
        name: "email-error",
        error: "Email is required",
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled Field",
        placeholder: "Can't edit this",
        name: "disabled-input",
        disabled: true,
    },
};

export const Required: Story = {
    args: {
        label: "Required Field",
        placeholder: "Enter something",
        name: "required-input",
        required: true,
    },
};