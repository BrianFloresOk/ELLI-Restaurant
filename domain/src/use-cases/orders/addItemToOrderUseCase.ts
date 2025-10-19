import { Product } from "../../entities/Product";
import { OrderItem } from "../../entities/OrderItem";
import { OrderService } from "../../services/orders/OrderService";

interface Payload {
    orderId: number;
    product: Product;
    quantity: number;
    notes?: string;
}

interface AddItemInput {
    dependencies: { orderService: OrderService };
    payload: Payload;
}

type OrderItemCreateData = Omit<OrderItem, "id">;

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
        const newItem: OrderItemCreateData = createOrderItem(payload);
        newItem.orderId = order.id;
        await orderService.addItem(orderId, newItem);
    }
}

async function findItemInOrder(orderService: OrderService, orderId: number, product: Product) {
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

function createOrderItem(payload: Payload): OrderItemCreateData {
    const { orderId, product, quantity, notes } = payload;
    return {
        notes,
        orderId: orderId,
        productId: product.id,
        quantity,
        unitPrice: product.price,
        subtotal: quantity * product.price,
        status: "PENDING",
    } as OrderItemCreateData;
}

async function findOrder(orderService: OrderService, orderId: number) {
    const order = await orderService.findById(orderId);
    if (!order) throw new Error("Pedido no encontrado.");
    if (order.status !== "OPEN")
        throw new Error(`No se puede modificar un pedido con estado ${order.status}.`);
    return order;
}