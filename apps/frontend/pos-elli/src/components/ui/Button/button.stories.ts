import React from "react";
import { Button } from ".";
import type { Meta, StoryObj } from "@storybook/react";
import { Check, Trash2, ArrowRight } from "lucide-react";

const meta: Meta<typeof Button> = {
    title: "UI/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary", "success", "danger", "disabled"],
        },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 🔹 Historias base
export const Primary: Story = {
    args: {
        label: "Primary",
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        label: "Secondary",
        variant: "secondary",
    },
};

export const Success: Story = {
    args: {
        label: "Success",
        variant: "success",
    },
};

export const Danger: Story = {
    args: {
        label: "Delete",
        variant: "danger",
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled",
        variant: "disabled",
    },
};

// 🔹 Tamaños
export const Small: Story = {
    args: {
        label: "Small",
        size: "small",
    },
};

export const Large: Story = {
    args: {
        label: "Large",
        size: "large",
    },
};

export const WithIconLeft: Story = {
    args: {
        label: "Save",
        variant: "success",
        size: "medium",
        icon: React.createElement(Check, { size: 18 }),
        iconPosition: "left",
    },
};

export const WithIconRight: Story = {
    args: {
        label: "Next",
        variant: "primary",
        size: "medium",
        icon: React.createElement(ArrowRight, { size: 18 }),
        iconPosition: "right",
    },
};

export const DangerWithIcon: Story = {
    args: {
        label: "Delete Item",
        variant: "danger",
        size: "medium",
        icon: React.createElement(Trash2, { size: 18 }),
        iconPosition: "left",
    },
};
