import { Payment } from "../../entities/Payment";

export interface PaymentService {
    save(payment: Omit<Payment, "id">): Promise<void>;
}