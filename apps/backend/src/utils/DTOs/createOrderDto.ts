export interface CreateOrderItemDto {
    productId: number;
    quantity: number;
    notes?: string;
}

export interface CreateOrderDto {
    tableId: number;
    waiterId: number;
    items?: CreateOrderItemDto[];
}