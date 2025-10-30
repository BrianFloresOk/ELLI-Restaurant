import { Button } from "."
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Button> = {
    title: "UI/Button",
    component: Button,
    parameters: {
        layout: "centered",
    }
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        label: "Primary Button",
        size: "medium",
        variant: "primary"
    }
}

export const Secondary: Story = {
    args: {
        label: "Secondary Button",
        size: "medium",
        variant: "secondary"
    }
}

export const Disabled: Story = {
    args: {
        label: "Disabled Button",
        size: "medium",
        variant: "disabled"
    }
}

export const Large: Story = {
    args: {
        label: "Large Button",
        size: "large",
        variant: "primary"
    }
}

export const Small: Story = {
    args: {
        label: "Small Button",
        size: "small",
        variant: "primary"
    }
}

export const Base: Story = {
    args: {
        label: "Base Button",
        size: "medium",
        variant: "primary"
    }
}

export const DisabledLarge: Story = {
    args: {
        label: "Disabled Large Button",
        size: "large",
        variant: "disabled"
    }
}

export const DisabledSmall: Story = {
    args: {
        label: "Disabled Small Button",
        size: "small",
        variant: "disabled"
    }
}