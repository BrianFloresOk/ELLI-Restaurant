import { Order } from "domain/src/entities";
import { OrderService } from "domain/src/services/orders/OrderService";

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