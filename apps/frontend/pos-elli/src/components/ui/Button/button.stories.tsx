import type { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const meta: Meta<typeof Button> = {
    title: "UI/Button",
    component: Button,
    tags: ["autodocs"],
    args: {
        children: "Button",
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
}

export const Outline: Story = {
    args: {
        variant: "outline",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
    },
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
    },
};

export const Link: Story = {
    args: {
        variant: "link",
    },
};

export const Accent: Story = {
    args: {
        variant: "accent",
    },
};

export const Success: Story = {
    args: {
        variant: "success",
    },
};

export const Warning: Story = {
    args: {
        variant: "warning",
    },
};

export const Small: Story = {
    args: {
        size: "sm",
    },
};

export const Large: Story = {
    args: {
        size: "lg",
    },
};

export const Icon: Story = {
    args: {
        size: "icon",
        children: "★",
    },
};
