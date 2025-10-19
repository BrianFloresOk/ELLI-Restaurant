import { OrderService } from "domain/src/services";
import { Order } from "../../entities/Order"



interface Dependencies {
    orderService: OrderService
}

interface CloseOrderInput {
    dependencies: Dependencies
    orderId: number
}

export const closeOrderUseCase = async (input: CloseOrderInput): Promise<void> => {
    const { dependencies, orderId } = input;
    const { orderService } = dependencies;

/* 
Calcular total de una orden
1- buscar todas los items de la orden
2- sumar los subtotales
3- actualizar o completar campo "total" de orden
4- actualizar a "closed" el estado
*/

    const order = await orderService.findById(orderId);
    if (!order) {
        throw new Error("Orden no encontrada.");
    }

    checkStatusOrder(order);

    const updatedOrder: Order = {
        ...order,
        status: "CLOSED"
    };

    await orderService.update(order.id, updatedOrder);
};

function checkStatusOrder(order: Order) {
    if(order.status !== "OPEN") {
        throw new Error("Solo se pueden cerrar órdenes en estado OPEN.");
    }
}

