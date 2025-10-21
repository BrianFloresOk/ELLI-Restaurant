import { Repository } from "typeorm";
import { dataSource } from "../database/data-source";
import { Payment, PaymentService } from "domain-elli";
import { PaymentEntity } from "../database/entities/PaymentEntity";

const paymentRepository : Repository<PaymentEntity> = dataSource.getRepository(PaymentEntity);

export const PaymentRepository : PaymentService = {

    save: async (payment: Omit<Payment, "id">): Promise<void> => {
        await paymentRepository.save(payment);
    },

};