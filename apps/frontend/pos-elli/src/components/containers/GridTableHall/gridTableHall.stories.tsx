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
            <TableHall number={1} status="free" />
            <TableHall number={2} status="occupied" />
            <TableHall number={3} status="reserved" />
            <TableHall number={4} status="free" />
            <TableHall number={5} status="occupied" />
            <TableHall number={6} status="free" />
            <TableHall number={7} status="free" />
            <TableHall number={8} status="occupied" />
        </GridTableHall>
    ),
};

export const TwoColumns: Story = {
    args: { columns: 2 },
    render: (args) => (
        <GridTableHall {...args}>
            {[1, 2, 3, 4].map((n) => (
                <TableHall key={n} number={n} status="free" />
            ))}
        </GridTableHall>
    ),
};

export const SixColumns: Story = {
    args: { columns: 6 },
    render: (args) => (
        <GridTableHall {...args}>
            {[...Array(12)].map((_, i) => (
                <TableHall key={i} number={i + 1} status="free" />
            ))}
        </GridTableHall>
    ),
};
