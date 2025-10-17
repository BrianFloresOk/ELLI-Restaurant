import { Entity } from "../utils/types/Entity"
import { ItemOrderStatus } from "../utils/types/ItemOrderStatus";

export interface OrderItem extends Entity {
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    status: ItemOrderStatus
    notes?: string;
}