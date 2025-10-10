import { Entity } from "../utils/types/Entity"

export interface OrderItem extends Entity {
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}
