import { Product } from "../../entities/Product";
import { OrderItem } from "../../entities/OrderItem";
import { OrderService } from "../../services/orders/OrderService";

interface Payload {
    orderId: string;
    product: Product;
    quantity: number;
}

interface AddItemInput {
    dependencies: { orderService: OrderService };
    payload: Payload;
}

export async function addItemToOrderUseCase({
    dependencies,
    payload,
}: AddItemInput): Promise<void> {
    const { orderService } = dependencies;
    const { orderId, product, quantity } = payload;

    if (!product?.id) throw new Error("Producto inválido.");
    if (quantity <= 0) throw new Error("La cantidad debe ser mayor a cero.");

    const order = await findOrder(orderService, orderId);
    const existingItem = await findItemInOrder(orderService, orderId, product);

    if (existingItem) {
        const updatedItem = updateQuantityAndTotalOfOrderItem(existingItem, quantity);

        await orderService.updateItem({
            orderId: order.id,
            itemId: existingItem.id,
            data: updatedItem,
        });
    } else {
        const newItem: OrderItem = createOrderItem(payload);
        await orderService.addItem(orderId, newItem);
    }
}

async function findItemInOrder(orderService: OrderService, orderId: string, product: Product) {
    const items = await orderService.listItems(orderId);

    const existingItem = items.find(i => i.productId === product.id);
    return existingItem;
}

function updateQuantityAndTotalOfOrderItem(existingItem: OrderItem, quantity: number) {
    return {
        ...existingItem,
        quantity: existingItem.quantity + quantity,
        subtotal: (existingItem.quantity + quantity) * existingItem.unitPrice,
    };
}

function createOrderItem(payload: Payload): OrderItem {
    const { orderId, product, quantity } = payload;
    return {
        id: crypto.randomUUID(),
        orderId,
        productId: product.id,
        quantity,
        unitPrice: product.price,
        subtotal: product.price * quantity,
        status: "PENDING",
    };
}

async function findOrder(orderService: OrderService, orderId: string) {
    const order = await orderService.findById(orderId);
    if (!order) throw new Error("Pedido no encontrado.");
    if (order.status !== "OPEN")
        throw new Error(`No se puede modificar un pedido con estado ${order.status}.`);
    return order;
}
