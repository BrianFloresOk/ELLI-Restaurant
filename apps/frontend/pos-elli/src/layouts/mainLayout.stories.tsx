import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Aside from "../components/containers/Aside";
import { GridTableHall } from "../components/containers/GridTableHall";
import { TableHall } from "../components/ui/TableHall";

function FakeOutlet() {
    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold">Contenido</h2>
            <p>Simulación del contenido del Outlet.</p>
        </div>
    );
}

const meta: Meta<typeof MainLayout> = {
    title: "POS/Layout/MainLayout",
    component: MainLayout,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/hall"]}>
                <div className="flex h-[600px] w-[900px] border border-gray-300 shadow-lg">
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
    render: () => (
        <div className="flex h-full w-full">
            <Aside />
            <div className="flex-1 bg-gray-50">
                <FakeOutlet />
            </div>
        </div>
    ),
};

export const Hall: Story = {
    args: { columns: 4 },
    render: (args) => (
        <div className="flex h-full w-full">
            <Aside />
            <main className="flex-1 bg-gray-50 p-6">
                <GridTableHall {...args}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <TableHall key={n} number={n} status="libre" />
                    ))}
                    {[7, 8, 9, 10, 11, 12].map((n) => (
                        <TableHall key={n} number={n} status="ocupada" />
                    ))}
                </GridTableHall>
            </main>
        </div>
    ),
};
