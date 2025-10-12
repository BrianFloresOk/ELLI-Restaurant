import { describe, it, expect } from "vitest";
import { listOrdersByStatusUseCase } from "./listOrdersByStatusUseCase";
import { Order } from "../../entities/Order";

describe("listOrdersByStatusUseCase", () => {
    it("debería filtrar los pedidos por estado", () => {

        const mockProduct1 = {
            id: "p2",
            name: "Empanada de carne",
            price: 800,
            type: "DISH",
            categoryId: "2"
        }


        const orders: Order[] = [
            {
                id: "1",
                tableId: "5",
                waiterId: "w1",
                status: "OPEN",
                items: [{ id: "1", orderId: "1", productId: mockProduct1.id, quantity: 2, unitPrice: mockProduct1.price, subtotal: mockProduct1.price * 2, status: "PENDING"}],
                total: 300
            }, {
                id: "2",
                tableId: "5",
                waiterId: "w1",
                status: "CLOSED",
                items: [{ id: "1", orderId: "1", productId: mockProduct1.id, quantity: 2, unitPrice: mockProduct1.price, subtotal: mockProduct1.price * 2, status: "PENDING" }],
                total: 300,
            }, {
                id: "3",
                tableId: "6",
                waiterId: "w1",
                status: "OPEN",
                items: [{ id: "1", orderId: "1", productId: mockProduct1.id, quantity: 2, unitPrice: mockProduct1.price, subtotal: mockProduct1.price * 2, status: "PENDING" }],
                total: 300,
            }
        ];
        
        const result = listOrdersByStatusUseCase({ orders, status: "OPEN" });

        expect(result).toHaveLength(2);
        expect(result.every((o) => o.status === "OPEN")).toBe(true);
    });

    it("debería lanzar error si no hay pedidos", () => {
        expect(() =>
            listOrdersByStatusUseCase({ orders: [], status: "CLOSED" })
        ).toThrow("No hay pedidos disponibles.");
    });
});
