import type { Meta, StoryObj } from "@storybook/react";
import { TableHall } from ".";


const meta: Meta<typeof TableHall> = {
    title: "Waiter/TableHall",
    component: TableHall,
};

export default meta;

type Story = StoryObj<typeof TableHall>;

export const Libre: Story = {
    args: {
        number: 1,
        status: "libre",
    },
};

export const Ocupada: Story = {
    args: {
        number: 5,
        status: "ocupada",
        guests: 4,
    },
};
