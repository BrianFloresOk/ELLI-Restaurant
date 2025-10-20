export interface CreatePaymentDto {
    orderId: number;
    method: string;
    amount: number;
    cashierId: number;
}