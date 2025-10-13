import { Order } from "../../entities/Order";
import { findAndValidateItem } from "../../utils/functions/itemProgress";
import { ItemOrderStatus } from "../../utils/types/ItemOrderStatus";

interface StartItemPreparationInput {
    order: Order;
    productId: string;
}

export function startItemPreparationUseCase(input: StartItemPreparationInput): Order {
    const { order, productId } = input;

    const REQUIRED_ORDER_STATUS = "OPEN";
    const REQUIRED_ITEM_STATUS: ItemOrderStatus = "PENDING";
    const NEXT_ITEM_STATUS: ItemOrderStatus = "IN_PROGRESS";

    const itemToPrepare = findAndValidateItem(order, productId, REQUIRED_ORDER_STATUS);

    if (itemToPrepare.status !== REQUIRED_ITEM_STATUS) {
        throw new Error(`No se puede iniciar la preparación. El ítem ya está en estado ${itemToPrepare.status}. Solo se pueden iniciar ítems ${REQUIRED_ITEM_STATUS}.`);
    }

    itemToPrepare.status = NEXT_ITEM_STATUS;
    return order;
}