import type { Meta, StoryObj } from "@storybook/react";
import SimpleAccordion, { type AccordionItemData } from ".";


const meta: Meta<typeof SimpleAccordion> = {
    title: "UI/Accordion",
    component: SimpleAccordion,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SimpleAccordion>;

const exampleItems: AccordionItemData[] = [
    {
        value: "item-1",
        title: "¿Qué es ELLI?",
        content:
            "ELLI es una marca enfocada en diseño moderno y accesible con un enfoque en usabilidad y ergonomía.",
    },
    {
        value: "item-2",
        title: "¿Cómo funciona el sistema de componentes?",
        content:
            "Todos los componentes están construidos usando React, TypeScript y Tailwind con tokens de diseño personalizables.",
    },
    {
        value: "item-3",
        title: "¿Tiene modo oscuro?",
        content:
            "Sí. El modo oscuro se activa automáticamente según las variables CSS del tema.",
    },
];

export const Default: Story = {
    args: {
        items: exampleItems,
    },
};

export const CustomClassName: Story = {
    args: {
        items: exampleItems,
        className: "rounded-lg border border-border p-4 bg-card",
    },
};
