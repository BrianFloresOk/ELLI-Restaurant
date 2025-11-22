import type { Meta, StoryObj } from '@storybook/react';
import OrderDetail from "./OrderDetail";


const meta: Meta<typeof OrderDetail> = {
    title: 'Pages/OrderDetail',
    component: OrderDetail,
    parameters: {
        layout: 'fullscreen',
    }
};

export default meta;

type Story = StoryObj<typeof OrderDetail>;

export const Default: Story = {};
