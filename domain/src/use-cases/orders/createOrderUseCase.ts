import { TableService } from "../../services/table/TableService";
import { Order } from "../../entities/order";
import { OrderService } from "../../services/orders/OrderService";
import { TableOccupied } from "../../utils/errors/TableErrors";

interface Payload {
    tableId: number;
    waiterId: number;
}

interface Dependencies {
    orderService: OrderService;
    tableService: TableService
}
interface CreateOrderInput {
    dependencies: Dependencies;
    payload: Payload;
}

type OrderCreateData = Omit<Order, "id">;

export async function createOrderUseCase({
    dependencies,
    payload,
}: CreateOrderInput): Promise<void> {
    const { orderService, tableService } = dependencies;
    validateOrderMetadata(payload);

    const isTableAvailable = await tableService.verifyTableAvailability(payload.tableId);

    if (!isTableAvailable) {
        throw new TableOccupied(`${payload.tableId}`);
    }


    const order: OrderCreateData = {
        tableId: payload.tableId,
        waiterId: payload.waiterId,
        status: "OPEN",
        orderDate: new Date(),
    };

    await orderService.save(order);
    await tableService.update(payload.tableId, { status: "OCCUPIED" });
}

function validateOrderMetadata(payload: Payload): void {
    if (!payload.tableId) {
        throw new Error("Table ID is required");
    }
    if (!payload.waiterId) {
        throw new Error("Waiter ID is required");
    }
}