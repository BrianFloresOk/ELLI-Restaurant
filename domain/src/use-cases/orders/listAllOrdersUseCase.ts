import { Order } from "../../entities/order";
import { OrderService } from "../../services/orders/OrderService";

interface Dependencies {
    orderService: OrderService;
}

interface ListAllOrdersInput {
    dependencies: Dependencies;
}

export const listAllOrdersUseCase = async ({ dependencies }: ListAllOrdersInput): Promise<Order[]> => {
    const { orderService } = dependencies;
    return orderService.list();
};