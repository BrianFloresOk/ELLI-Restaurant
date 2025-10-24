import { ErrorDomain } from "./Error";

export class OrderNotFound extends ErrorDomain {
    constructor(orderId: string) {
        super(`Order with ID ${orderId} not found.`);
        this.name = "OrderNotFound";
    }
}