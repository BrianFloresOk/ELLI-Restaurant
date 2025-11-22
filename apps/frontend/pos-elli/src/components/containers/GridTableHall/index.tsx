import type { PropsWithChildren } from "react";

interface GridTableHallProps {
    columns?: number;
    gap?: number;
    padding?: number;
}

export function GridTableHall({
    children,
    columns = 4,
    gap = 4,
    padding = 4,
}: PropsWithChildren<GridTableHallProps>) {
    return (
        <section className={`p-${padding}`}>
            <div
                className={`grid gap-${gap}`}
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
            >
                {children}
            </div>
        </section>
    );
}
