import type { Meta, StoryObj } from '@storybook/react';
import Orders from "./Orders";


const meta: Meta<typeof Orders> = {
    title: 'Pages/Orders',
    component: Orders,
    parameters: {
        layout: 'fullscreen',
    }
};

export default meta;

type Story = StoryObj<typeof Orders>;

export const Default: Story = {};
