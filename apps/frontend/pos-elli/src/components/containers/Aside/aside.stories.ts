import type { Meta, StoryObj } from "@storybook/react";
import Aside from ".";


const meta: Meta<typeof Aside> = {
    title: "Example/Aside",
    component: Aside,
    parameters: {
        layout: "fullscreen",
    }
};

export default meta;

type Story = StoryObj<typeof Aside>;

export const Default: Story = {};