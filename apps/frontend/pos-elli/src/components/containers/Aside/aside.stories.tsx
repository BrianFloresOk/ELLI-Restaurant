import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Aside from ".";


const meta: Meta<typeof Aside> = {
    title: "POS/Navigation/Aside",
    component: Aside,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/mesas"]}>
                <div className="h-[600px] w-[250px] border border-gray-300 shadow-lg">
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Aside>;

export const Default: Story = {
    render: () => <Aside />,
};
