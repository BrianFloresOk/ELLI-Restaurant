import { Users } from "lucide-react";
import Badge from "../Badge";

interface TableHallProps {
    number: number;
    status: "libre" | "ocupada";
    guests?: number;
    onClick?: () => void;
}

export function TableHall({ number, status, guests, onClick }: TableHallProps) {
    const isFree = status === "libre";

    return (
        <div
            onClick={onClick}
            className={`
                relative cursor-pointer rounded-xl border bg-card
                shadow-card transition-all duration-200
                hover:shadow-lg hover:-translate-y-1
                ${isFree
                    ? "border-success/50 hover:border-success"
                    : "border-destructive/50 hover:border-destructive"
                }
            `}
            style={{ borderRadius: "var(--radius)" }}
        >
            <div className="p-6 flex flex-col items-center justify-center min-h-[150px]">

                {/* Número de mesa */}
                <div className="text-4xl font-extrabold text-card-foreground mb-3">
                    {number}
                </div>

                {/* Badge */}
                <Badge variant={isFree ? "free" : "destructive"}>
                    {isFree ? "Libre" : "Ocupada"}
                </Badge>

                {/* Cantidad de personas */}
                {!isFree && guests && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
                        <Users className="w-4 h-4" />
                        <span>{guests} personas</span>
                    </div>
                )}

                {/* Mensaje de acción */}
                <div className="text-xs text-muted-foreground mt-3 text-center">
                    {isFree ? "Toca para crear pedido" : "Toca para ver pedido"}
                </div>
            </div>
        </div>
    );
}
