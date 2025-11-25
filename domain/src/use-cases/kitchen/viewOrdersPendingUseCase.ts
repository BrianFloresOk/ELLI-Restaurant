import { OrderService } from "../../services/orders/OrderService"
import { UserService } from "../../services/users/UserService"
import { ProductService } from "../../services/product/ProductService"

interface Dependencies {
    orderService: OrderService;
    userService: UserService;
    productService: ProductService;
}

interface OrderInfo {
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

interface ViewOrdersInput {
    dependencies: Dependencies;
}

export async function viewOrdersPendingUseCase({ dependencies }: ViewOrdersInput): Promise<OrderInfo[] | null> {
    const { orderService, userService, productService } = dependencies;
    
    const orders = await orderService.list();
    const openOrders = orders.filter(order => order.status === "OPEN");

    const detailedOrders: OrderInfo[] = [];

    for (const order of openOrders) {
        const waiter = await userService.findById(order.waiterId);
        const items = await orderService.listItems(order.id);

        const detailedItems = await Promise.all(
            items.map(async (item: any) => {
                const product = await productService.findById(item.productId);

                return {
                    product: product?.name || "Producto desconocido",
                    quantity: item.quantity,
                    subtotal: product ? product.price * item.quantity : 0,
                    status: item.status,
                };
            })
        );

        detailedOrders.push({
            orderNumber: order.id,
            tableId: order.tableId,
            waiter: waiter?.name || "Desconocido",
            status: order.status,
            orderDate: order.orderDate,
            orderItems: detailedItems,
        });
    }

    return detailedOrders;
}