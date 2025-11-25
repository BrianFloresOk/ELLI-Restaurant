import { useState } from "react";
import { paymentService } from "../services/payment.service";


interface RegisterPaymentInput {
    orderId: number;
    method: string;
    amount: number;
    cashierId: number;
}

interface UseRegisterPaymentReturn {
    loading: boolean;
    error: string | null;
    success: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerPayment: (payload: RegisterPaymentInput) => Promise<any>;
}

export function useRegisterPayment(): UseRegisterPaymentReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const registerPayment = async (payload: RegisterPaymentInput) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await paymentService.registerPayment(payload);
            setSuccess(true);
            return response;
        } catch (err) {
            console.log(err)
            setError("Error al registrar el pago");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        success,
        registerPayment,
    };
}
