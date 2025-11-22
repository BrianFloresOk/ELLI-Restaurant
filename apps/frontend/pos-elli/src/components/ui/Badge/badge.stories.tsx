import type { Meta, StoryObj } from "@storybook/react";
import Badge from ".";

const meta: Meta<typeof Badge> = {
    title: "UI/Badge",
    component: Badge,
    tags: ["autodocs"],

    argTypes: {
        variant: {
            control: "select",
            options: ["default", "secondary", "destructive", "outline", "free", "occupied"],
        },
        children: {
            control: "text",
        },
    },

    args: {
        children: "Badge",
        variant: "default",
    },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Secondary",
    },
};

export const Destructive: Story = {
    args: {
        variant: "destructive",
        children: "Destructive",
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        children: "Outline",
    },
};

export const Free: Story = {
    args: {
        variant: "free",
        children: "Libre",
    },
};

export const Occupied: Story = {
    args: {
        variant: "occupied",
        children: "Ocupada",
    },
};
