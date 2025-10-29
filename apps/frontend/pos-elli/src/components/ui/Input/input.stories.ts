import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "."

const meta: Meta<typeof Input> = {
    title: "UI/Input",
    component: Input,
    tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>
export const TextInput: Story = {
    args: {
        label: "Text Input",
        placeholder: "Enter text",
        type: "text",
        size: "medium",
    },
}