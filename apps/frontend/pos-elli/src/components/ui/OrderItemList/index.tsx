import { OrderItemRow } from "../OrderItemRow";


interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface OrderItemsListProps {
    items: Item[];

    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
}

export function OrderItemsList({
    items,
    onIncrease,
    onDecrease,
    onRemove,
}: OrderItemsListProps) {
    if (items.length === 0) {
        return (
            <p className="text-center text-muted-foreground py-4">
                No hay productos en esta orden.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {items.map((item) => (
                <OrderItemRow
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}
