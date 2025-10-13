// Importamos OrderItem e ItemOrderStatus
import { Order } from "../../entities/Order";
import { findAndValidateItem } from "../../utils/functions/itemProgress";
import { ItemOrderStatus } from "../../utils/types/ItemOrderStatus";

interface MarkOrderItemAsReadyInput {
    order: Order;
    productId: string;
}

export function markOrderItemAsReadyUseCase(input: MarkOrderItemAsReadyInput): Order {
    const { order, productId } = input;
    const REQUIRED_ORDER_STATUS = "OPEN";
    const REQUIRED_ITEM_STATUS: ItemOrderStatus = "IN_PROGRESS";
    const NEXT_ITEM_STATUS: ItemOrderStatus = "COMPLETED";

    const itemToMark = findAndValidateItem(order, productId, REQUIRED_ORDER_STATUS);

    if (itemToMark.status !== REQUIRED_ITEM_STATUS) {
        throw new Error(`Solo se pueden marcar como listos los ítems en estado ${REQUIRED_ITEM_STATUS}. El estado actual es ${itemToMark.status}.`);
    }

    itemToMark.status = NEXT_ITEM_STATUS;

    return order;
}