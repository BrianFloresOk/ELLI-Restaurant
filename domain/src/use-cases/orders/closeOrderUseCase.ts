import { Order } from "../../entities/Order"

export const closeOrderUseCase = (order: Order): Order => {
    if (!order) {
        throw new Error("La orden es requerida.");
    }

    checkStatusOrder(order);

    const updatedOrder: Order = {
        ...order,
        status: "CLOSED"
    };

    return updatedOrder;
};

function checkStatusOrder(order: Order) {
    if (order.status === "CLOSED") {
        throw new Error("La orden ya está cerrada.");
    }

    if (order.status === "CANCELLED") {
        throw new Error("No se puede cerrar una orden cancelada.");
    }

    if (order.status !== "COMPLETED") {
        throw new Error("Solo se pueden cerrar órdenes marcadas como COMPLETED.");
    }
}

