import React from "react";

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Card({ title, children, className = "" }: CardProps) {
    return (
        <div
            className={`rounded-xl border border-border bg-card p-6 shadow-sm ${className}`}
        >
            {title && (
                <h2 className="text-xl font-semibold mb-4">
                    {title}
                </h2>
            )}

            {children}
        </div>
    );
}
