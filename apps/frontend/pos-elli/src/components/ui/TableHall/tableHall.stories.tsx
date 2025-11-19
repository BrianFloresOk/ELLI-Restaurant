import { TableHall } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TableHall> = {
    title: "UI/TableHall",
    component: TableHall,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    }
};

export default meta;
type Story = StoryObj<typeof TableHall>;

export const Free: Story = {
    args: {
        number: 1,
        status: "free",
    },
};

export const Occupied: Story = {
    args: {
        number: 4,
        status: "occupied",
    },
};

export const Reserved: Story = {
    args: {
        number: 7,
        status: "reserved",
    },
};