import type { Meta, StoryObj } from '@storybook/react';
import Hall from './Hall';



const meta: Meta<typeof Hall> = {
    title: 'Pages/Hall',
    component: Hall,
    parameters: {
        layout: 'fullscreen',
    }
};

export default meta;

type Story = StoryObj<typeof Hall>;

export const Default: Story = {};
