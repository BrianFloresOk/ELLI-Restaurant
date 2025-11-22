import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface BaseProps {
    className?: string;
    children: ReactNode;
}

interface AccordionTriggerProps extends BaseProps {
    isOpen: boolean;
    onToggle: () => void;
}

interface AccordionContentProps extends BaseProps {
    isOpen: boolean;
}

export interface AccordionItemData {
    value: string;
    title: ReactNode;
    content: ReactNode;
}

interface SimpleAccordionProps {
    items: AccordionItemData[];
    className?: string;
}

export function Accordion({ children, className = "" }: BaseProps) {
    return <div className={className}>{children}</div>;
}

export function AccordionItem({ children, className = "" }: BaseProps) {
    return (
        <div className={`border-b border-border ${className}`}>
            {children}
        </div>
    );
}

export function AccordionTrigger({
    children,
    isOpen,
    onToggle,
    className = "",
}: AccordionTriggerProps) {
    return (
        <button
            onClick={onToggle}
            className={`
        flex w-full items-center justify-between py-4 font-medium
        text-foreground transition-all hover:underline
        ${className}
      `}
        >
            {children}
            <ChevronDown
                className={`
          h-4 w-4 transition-transform duration-200
          ${isOpen ? "rotate-180" : "rotate-0"}
        `}
            />
        </button>
    );
}

/* Content */
export function AccordionContent({
    children,
    isOpen,
    className = "",
}: AccordionContentProps) {
    return (
        <div
            className={`
        overflow-hidden text-sm transition-all duration-300
        ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
      `}
        >
            <div className={`pb-4 ${className}`}>{children}</div>
        </div>
    );
}

/* Default export → Accordion listo para usar con lista de items */
export default function SimpleAccordion({
    items,
    className = "",
}: SimpleAccordionProps) {
    const [openItem, setOpenItem] = useState<string | null>(null);

    const toggle = (value: string) => {
        setOpenItem(openItem === value ? null : value);
    };

    return (
        <Accordion className={className}>
            {items.map((item) => {
                const isOpen = openItem === item.value;

                return (
                    <AccordionItem key={item.value}>
                        <AccordionTrigger
                            isOpen={isOpen}
                            onToggle={() => toggle(item.value)}
                        >
                            {item.title}
                        </AccordionTrigger>

                        <AccordionContent isOpen={isOpen}>
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
