import { OrderService } from "domain/src/services";
import { Order } from "../../entities/Order"
import { OrderItem } from "domain/src/entities";

interface Dependencies {
    orderService: OrderService
}

interface CloseOrderInput {
    dependencies: Dependencies
    orderId: number
}

export const closeOrderUseCase = async ({ dependencies, orderId }: CloseOrderInput): Promise<void> => {
    const { orderService } = dependencies;

    const order = await orderService.findById(orderId);
    if (!order) {
        throw new Error("Orden no encontrada.");
    }

    checkStatusOrder(order);

    const total = calculateTotal(order.orderItems || []);

    const updatedOrder: Order = updateOrder(order, total);

    await orderService.update(order.id, updatedOrder);
};

function updateOrder(order: Order, total: number): Order {
    return {
        ...order,
        status: "CLOSED",
        total: total,
        closedDate: new Date(),
    };
}

function checkStatusOrder(order: Order) {
    if(order.status !== "OPEN") {
        throw new Error("Solo se pueden cerrar órdenes en estado OPEN.");
    }
}

function calculateTotal(orderItems: OrderItem[]): number {
    return orderItems.reduce((total, item) => total + item.subtotal, 0);
}

