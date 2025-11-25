import { Minus, Plus, Trash2 } from "lucide-react";

interface OrderItemRowProps {
    id: number;
    name: string;
    price: number;
    quantity: number;

    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
}

export function OrderItemRow({
    id,
    name,
    price,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
}: OrderItemRowProps) {
    return (
        <div className="flex items-center justify-between p-3 border rounded-xl bg-card">
            {/* Nombre */}
            <div className="flex-1">
                <p className="font-semibold capitalize">{name}</p>
                <p className="text-sm text-muted-foreground">
                    ${price.toLocaleString()}
                </p>
            </div>

            {/* Controles de cantidad */}
            <div className="flex items-center gap-2">
                <button
                    className="p-1 border rounded-lg hover:bg-muted"
                    onClick={() => onDecrease(id)}
                    disabled={quantity <= 1}
                >
                    <Minus className="w-4 h-4" />
                </button>

                <span className="font-semibold w-6 text-center">{quantity}</span>

                <button
                    className="p-1 border rounded-lg hover:bg-muted"
                    onClick={() => onIncrease(id)}
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Subtotal */}
            <p className="w-20 text-right font-bold">
                ${(price * quantity).toLocaleString()}
            </p>

            {/* Eliminar */}
            <button
                className="p-2 ml-3 text-red-500 hover:bg-red-50 rounded-lg"
                onClick={() => onRemove(id)}
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
}
