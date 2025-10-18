export interface CreateOrderItemDto {
    productId: number;
    quantity: number;
}

export interface CreateOrderDto {
    tableId: number;
    waiterId: number;
    items?: CreateOrderItemDto[];
}