import { Payment } from "domain/src/entities";

export interface PaymentService {
    save(payment: Omit<Payment, "id">): Promise<void>;
}