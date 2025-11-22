import type { Meta, StoryObj } from "@storybook/react";
import { Card } from ".";

const meta: Meta<typeof Card> = {
    title: "UI/Card",
    component: Card,
    args: {
        className: "",
        title: "Título del Card",
        children: "Contenido del card..."
    }
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithoutTitle: Story = {
    args: {
        title: undefined,
        children: (
            <div>
                <p>Este card no usa encabezado.</p>
            </div>
        )
    }
};

export const WithCustomContent: Story = {
    args: {
        title: "Card Personalizado",
        children: (
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Podés agregar cualquier contenido aquí: textos, botones, imágenes, etc.
                </p>

                <button className="bg-accent text-white px-4 py-2 rounded-lg">
                    Acción
                </button>
            </div>
        )
    }
};

export const Elevated: Story = {
    args: {
        title: "Card Elevado",
        className: "shadow-lg",
    }
};
