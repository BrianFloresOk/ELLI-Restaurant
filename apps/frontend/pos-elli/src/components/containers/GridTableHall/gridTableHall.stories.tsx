import type { Meta, StoryObj } from "@storybook/react";
import { GridTableHall } from ".";
import { TableHall } from "../../ui/TableHall";

const meta: Meta<typeof GridTableHall> = {
    title: "Waiter/GridTableHall",
    component: GridTableHall,
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof GridTableHall>;

export const DefaultGrid: Story = {
    args: { columns: 4 },
    render: (args) => (
        <GridTableHall {...args}>
            <TableHall number={1} status="libre" />
            <TableHall number={2} status="ocupada" />
            <TableHall number={3} status="ocupada" />
            <TableHall number={4} status="libre" />
            <TableHall number={5} status="ocupada" />
            <TableHall number={6} status="libre" />
            <TableHall number={7} status="libre" />
            <TableHall number={8} status="ocupada" />
        </GridTableHall>
    ),
};

export const TwoColumns: Story = {
    args: { columns: 2 },
    render: (args) => (
        <GridTableHall {...args}>
            {[1, 2, 3, 4].map((n) => (
                <TableHall key={n} number={n} status="libre" />
            ))}
        </GridTableHall>
    ),
};

export const SixColumns: Story = {
    args: { columns: 6 },
    render: (args) => (
        <GridTableHall {...args}>
            {[...Array(12)].map((_, i) => (
                <TableHall key={i} number={i + 1} status="libre" />
            ))}
        </GridTableHall>
    ),
};
