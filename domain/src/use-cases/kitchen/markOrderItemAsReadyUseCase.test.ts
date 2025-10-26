import { describe, it, expect, vi, beforeEach } from "vitest";
import { markOrderItemAsReadyUseCase } from "./markOrderItemAsReadyUseCase";
import { OrderService } from "../../services/orders/OrderService";
import { ErrorDomain } from "../../utils/errors";

describe("markOrderItemAsReady", () => {
  const mockOrder = {
    id: 1,
    status: "OPEN",
    tableId: 10,
    waiterId: 3,
    orderItems: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ],
  };

  let orderService: {
    findById: ReturnType<typeof vi.fn>;
    updateItemStatusByOrder: ReturnType<typeof vi.fn>;
  };

  let dependencies: { orderService: OrderService };

  beforeEach(() => {
    orderService = {
      findById: vi.fn().mockResolvedValue(mockOrder),
      updateItemStatusByOrder: vi.fn().mockResolvedValue(true),
    };

    dependencies = {
      orderService: orderService as unknown as OrderService,
    };
  });

  it("debería actualizar los ítems a COMPLETED si la orden está abierta", async () => {
    await markOrderItemAsReadyUseCase({
      dependencies,
      payload: { orderId: 1 },
    });

    expect(orderService.findById).toHaveBeenCalledWith(1);
    expect(orderService.updateItemStatusByOrder).toHaveBeenCalledWith(
      1,
      "IN_PROGRESS",
      "COMPLETED"
    );
  });

  it("debería lanzar OrderNotFound si la orden no existe", async () => {
    orderService.findById.mockResolvedValueOnce(null);

    await expect(
      markOrderItemAsReadyUseCase({
        dependencies,
        payload: { orderId: 999 },
      })
    ).rejects.toBeInstanceOf(ErrorDomain);

    expect(orderService.updateItemStatusByOrder).not.toHaveBeenCalled();
  });

  it("debería lanzar error si la orden no está en estado OPEN", async () => {
    orderService.findById.mockResolvedValueOnce({
      ...mockOrder,
      status: "CLOSED",
    });

    await expect(
      markOrderItemAsReadyUseCase({
        dependencies,
        payload: { orderId: 1 },
      })
    ).rejects.toThrow(
      "Solo se pueden enviar a cocina pedidos que estén abiertos (estado: CLOSED)."
    );

    expect(orderService.updateItemStatusByOrder).not.toHaveBeenCalled();
  });
});
