import * as React from "react";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "free" | "occupied" | "accent";

const BASE_CLASSES = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

const VARIANT_MAP: Record<BadgeVariant, string> = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
    free: "bg-green-500 text-white",
    occupied: "bg-red-500 text-gray-100",
    accent: "bg-accent text-white"
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: BadgeVariant;
    className?: string;
}

export default function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variantClasses = VARIANT_MAP[variant];
        const allClasses = `${BASE_CLASSES} ${variantClasses} ${className || ""}`;

    return (
        <div 
            className={allClasses} 
            {...props} 
        />
    );
}