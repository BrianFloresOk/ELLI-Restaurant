import { OrderService, ProductService, TableService } from "domain/src/services";
import { Order } from "../../entities/Order";
import { OrderNotFound } from "../../utils/errors/OrderErrors";

interface Dependencies {
    orderService: OrderService;
    tableService: TableService;
    productService: ProductService;
}

interface CloseOrderInput {
    dependencies: Dependencies;
    orderId: number;
}

interface ClosedOrderInfo {
    orderNumber: number;
    tableId: number;
    waiterId: number;
    status: string;
    orderDate: Date;
    closedDate: Date;
    total: number;
}

export const closeOrderUseCase = async ({
    dependencies,
    orderId,
}: CloseOrderInput): Promise<ClosedOrderInfo> => {
    const { orderService, tableService, productService } = dependencies;

    const order = await orderService.findById(orderId);
    if (!order) throw new OrderNotFound("Orden no encontrada.");

    ensureOrderIsOpen(order);

    const updatedOrder = updateOrder(order);
    await orderService.update(order.id, updatedOrder);
    await tableService.update(order.tableId, { status: "AVAILABLE" });

    const total = await calculateOrderTotal(order.orderItems || [], productService);

    return {
        orderNumber: order.id,
        tableId: order.tableId,
        waiterId: order.waiterId,
        status: updatedOrder.status,
        orderDate: order.orderDate,
        closedDate: updatedOrder.closedDate!,
        total,
    };
};

async function calculateOrderTotal(orderItems: any[], productService: ProductService): Promise<number> {
    const subtotals = await Promise.all(
        orderItems.map(async (item) => {
            const product = await productService.findById(item.productId);
            return product ? product.price * item.quantity : 0;
        })
    );
    return subtotals.reduce((sum, s) => sum + s, 0);
}

function ensureOrderIsOpen(order: Order) {
    if (order.status !== "OPEN") {
        throw new Error("Solo se pueden cerrar órdenes en estado OPEN.");
    }
}

function updateOrder(order: Order): Order { return { ...order, status: "CLOSED", closedDate: new Date(), }; }
