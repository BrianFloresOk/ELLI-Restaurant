export type OrderStatus = "pending" | "preparing" | "served" | "paid";
export type PaymentMethod = "cash" | "card" | "transfer";
export interface OrderItem {
    menuItem: MenuItem;
    quantity: number;
}


export interface MenuItem {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    description?: string;
}

export interface Order {
    id: string;
    tableNumber: number;
    status: OrderStatus;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    total: number;
    createdAt: Date;
    paymentMethod?: PaymentMethod;
}
