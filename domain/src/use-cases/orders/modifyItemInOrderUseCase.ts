import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { OrderService } from "../../services/orders/OrderService";
import { ProductService } from "../../services/product/ProductService";

interface ModifyItemInOrderInput {
    dependencies: {
        orderService: OrderService;
        productService: ProductService;
    };
    payload: {
        orderId: number;
        productId: number;
        quantity: number;
        notes?: string;
    };
}


export async function modifyItemInOrderUseCase({
    dependencies,
    payload,
}: ModifyItemInOrderInput): Promise<void> {
    const { orderService, productService } = dependencies;
    const { orderId, productId, quantity, notes } = payload;

    if (!productId) throw new Error("Producto inválido.");
    if (quantity < 0) throw new Error("La cantidad no puede ser negativa.");

    const order = await getOrder(orderService, orderId);
    const existingItem = await orderService.findItemByProduct(order.id, productId);

    if (existingItem && quantity === 0) {
        await orderService.removeItem(order.id, existingItem.id);
        return;
    }

    if (!existingItem && quantity === 0) return;

    const product = await getProduct(productService, productId);

    if (existingItem) {
        await orderService.updateItemQuantity({
            orderId: order.id,
            itemId: existingItem.id,
            quantity,
        });
    } else {
        const newItem = {
            productId: product.id,
            unitPrice: product.price,
            quantity,
            notes,
            status: "PENDING",
        };

        await orderService.addItem(order.id, newItem as any);
    }
}

async function getOrder(
    orderService: OrderService,
    orderId: number
): Promise<Order> {
    const order = await orderService.findById(orderId);
    if (!order) throw new Error("Pedido no encontrado.");
    if (order.status !== "OPEN") {
        throw new Error(`No se puede modificar un pedido con estado ${order.status}.`);
    }
    return order;
}

async function getProduct(
    productService: ProductService,
    productId: number
): Promise<Product> {
    const product = await productService.findById(productId);
    if (!product) throw new Error("Producto no encontrado.");
    return product;
}
