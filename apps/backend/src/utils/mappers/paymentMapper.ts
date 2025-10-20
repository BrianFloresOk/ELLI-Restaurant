import { Payment } from "domain-elli";
import { PaymentEntity } from "../../database/entities/PaymentEntity";
import { IMapper } from "../../types/IMapper";

export const paymentMapper: IMapper<Payment, PaymentEntity> = {
    toDomain,
    toPersistence
}

function toDomain(entity: PaymentEntity): Payment {
    const paymentDomain: Payment = {
        id: entity.id,
        orderId: entity.orderId,
        method: entity.method as Payment["method"],
        amount: entity.amount,
        paidAt: entity.paidAt,
    }
    return paymentDomain;
}

function toPersistence(domain: Payment): PaymentEntity {

    const now = new Date();
    now.setMilliseconds(0);

    const paymentEntity: PaymentEntity = {
        id: domain.id,
        orderId: domain.orderId,
        method: domain.method,
        amount: domain.amount,
        paidAt: now,
    };
    return paymentEntity;
}