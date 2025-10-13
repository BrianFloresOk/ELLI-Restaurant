import { Order } from "../../entities/Order";

interface ViewOrderStatusInput {
    order: Order;
}

interface ViewOrderStatusOutput {
    orderId: string;
    tableId: string;
    status: Order["status"];
    total: number;
    items: {
        productId: string;
        quantity: number;
        status: string;
        subtotal: number;
    }[];
}

export function viewOrderStatusUseCase(input: ViewOrderStatusInput): ViewOrderStatusOutput {
    const { order } = input;

    if (!order) {
        throw new Error("La orden es requerida.");
    }

    return {
        orderId: order.id,
        tableId: order.tableId,
        status: order.status,
        total: order.total,
        items: order.items?.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            status: item.status,
            subtotal: item.subtotal
        })) || []
    };
}
