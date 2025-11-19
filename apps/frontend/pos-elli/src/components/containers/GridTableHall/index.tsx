import type { PropsWithChildren } from "react";

interface GridTableHallProps {
    columns?: number;
}

export function GridTableHall({ children, columns = 4 }: PropsWithChildren<GridTableHallProps>) {
    return (
        <section className="p-4">
            <div
                className="grid gap-4"
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
            >
                {children}
            </div>
        </section>
    );
}
