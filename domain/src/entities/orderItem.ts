import { Entity } from "../utils/types/Entity"
import { ItemOrderStatus } from "../utils/types/ItemOrderStatus";

export interface OrderItem extends Entity {
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    status: ItemOrderStatus
    notes?: string;
}