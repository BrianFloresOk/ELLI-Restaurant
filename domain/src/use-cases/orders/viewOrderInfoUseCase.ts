import { OrderNotFound } from "../../utils/errors/OrderErrors";
import { ProductService, UserService, OrderService } from "../../services";


interface Dependencies {
    orderService: OrderService,
    userService: UserService,
    productService: ProductService
}
interface ViewOrderInput {
    dependencies: Dependencies,
    orderId: number,
}

interface InfoDetailOrder {
    orderNumber: number;
    tableId: number;
    waiter: string;
    status: string;
    orderDate: Date;
    orderItems: Array<{
        product: string;
        quantity: number;
        subtotal?: number;
        status: string;
    }>;
}

export async function viewOrderInfoUseCase({ dependencies, orderId }: ViewOrderInput) : Promise<InfoDetailOrder> {
    const { orderService, userService, productService } = dependencies

    const order = await orderService.findById(orderId);

    if (!order) {
        throw new OrderNotFound(`El pedido con ID ${orderId} no existe.`);
    }

    const user = await userService.findById(order.waiterId);
    const orderItems = order.orderItems || [];

    const products = await Promise.all(orderItems.map(async (item) => {
        const product = await productService.findById(item.productId);
        return {
            product: product?.name || "Producto desconocido",
            quantity: item.quantity,
            subtotal: product ? product.price * item.quantity : 0,
            status: item.status
        };
    }));

    const infoDetailOrder: InfoDetailOrder = {
        orderNumber: order.id,
        tableId: order.tableId,
        waiter: user?.name || "Desconocido",
        status: order.status,
        orderDate: order.orderDate,
        orderItems: products,
    }

    return infoDetailOrder;
}
