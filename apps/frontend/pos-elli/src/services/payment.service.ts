import { API_ROUTES } from "../config/api_routes";
import api from "./api";

interface RegisterPaymentInput {
    orderId: number,
    method: string,
    amount: number,
    cashierId: number
}

export const paymentService = {

    registerPayment: async (payload: RegisterPaymentInput) => {
        const response = await api.post(API_ROUTES.CASHIER.REGISTER_PAY, payload, { withCredentials: true })
        return response.data
    }

}