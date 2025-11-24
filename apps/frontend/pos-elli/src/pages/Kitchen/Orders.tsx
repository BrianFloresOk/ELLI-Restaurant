import { useState } from "react";
import { Clock, ChefHat } from "lucide-react";
import Badge, { type BadgeVariant } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import type { MenuItem, Order, OrderStatus } from "../../types";


// --- DATA DE PRUEBA ---
// eslint-disable-next-line react-refresh/only-export-components
export const menuItems: MenuItem[] = [
    {
        id: "1",
        name: "Filet Mignon",
        category: "Carnes",
        price: 45.00,
        image: "/placeholder.svg",
        description: "Filete de res premium con reducción de vino tinto"
    },
    {
        id: "2",
        name: "Salmón a la Parrilla",
        category: "Pescados",
        price: 38.00,
        image: "/placeholder.svg",
        description: "Salmón noruego con vegetales al vapor"
    },
    {
        id: "3",
        name: "Risotto de Hongos",
        category: "Pastas",
        price: 28.00,
        image: "/placeholder.svg",
        description: "Arroz cremoso con hongos porcini y trufa"
    },
    {
        id: "4",
        name: "Ensalada César",
        category: "Entradas",
        price: 15.00,
        image: "/placeholder.svg",
        description: "Lechuga romana, crutones y aderezo césar"
    },
];

// ----------------------------------------------------------
//  Kitchen Component
// ----------------------------------------------------------
const Kitchen = () => {
    const [orders, setOrders] = useState<Order[]>([
        {
            id: "order-001",
            tableNumber: 3,
            status: "pending",
            items: [
                { menuItem: menuItems[0], quantity: 2 },
                { menuItem: menuItems[3], quantity: 1 }
            ],
            subtotal: 45.97,
            tax: 6.90,
            total: 52.87,
            createdAt: new Date(Date.now() - 10 * 60000)
        },
        {
            id: "order-002",
            tableNumber: 5,
            status: "preparing",
            items: [
                { menuItem: menuItems[2], quantity: 1 },
                { menuItem: menuItems[1], quantity: 1 }
            ],
            subtotal: 27.98,
            tax: 4.20,
            total: 32.18,
            createdAt: new Date(Date.now() - 25 * 60000)
        }
    ]);

    const getStatusConfig = (status: OrderStatus): {
        label: string,
        variant: BadgeVariant,
        button: string | null,
        next: OrderStatus | null
    } => {
        switch (status) {
            case "pending":
                return {
                    label: "Pendiente",
                    variant: "destructive", // rojo
                    button: "Marcar en Preparación",
                    next: "preparing" as OrderStatus,
                };

            case "preparing":
                return {
                    label: "En Preparación",
                    variant: "accent", // amarillo / neutral
                    button: "Marcar Completado",
                    next: "served" as OrderStatus,
                };

            case "served":
                return {
                    label: "Completado",
                    variant: "free", // verde / éxito
                    button: null,
                    next: null,
                };

            default:
                return {
                    label: "Pagado",
                    variant: "outline",
                    button: null,
                    next: null,
                };
        }
    };

    const updateOrderStatus = (id: string, newStatus: OrderStatus) => {
        setOrders(prev =>
            prev.map(o => o.id === id ? { ...o, status: newStatus } : o)
        );
    };

    const formatTime = (date: Date) => {
        const diff = Date.now() - date.getTime();
        const mins = Math.floor(diff / 60000);

        if (mins < 60) return `${mins} min`;
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
    };

    const active = orders.filter(o => ["pending", "preparing"].includes(o.status));
    const completed = orders.filter(o => o.status === "served");

    return (
        <section className="p-6 max-w-7xl mx-auto space-y-10">

            {/* HEADER POS */}
            <div className="bg-card rounded-xl p-6 shadow-sm border flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-xl">
                        <ChefHat className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Cocina</h1>
                        <p className="text-sm text-muted-foreground">
                            Pedidos activos en preparación
                        </p>
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-amber-600">
                            {orders.filter(o => o.status === "pending").length}
                        </p>
                        <span className="text-muted-foreground text-sm">Pendientes</span>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">
                            {orders.filter(o => o.status === "preparing").length}
                        </p>
                        <span className="text-muted-foreground text-sm">En Cocina</span>
                    </div>
                </div>
            </div>

            {/* PEDIDOS ACTIVOS */}
            <section>
                <h2 className="text-xl font-bold mb-4">Pedidos Activos</h2>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {active.map(order => {
                        console.log(order)
                        console.log(order.status)
                        const cfg = getStatusConfig(order.status);
                        console.log(cfg)

                        return (
                            <Card
                                key={order.id}
                                className="p-5 border-2 rounded-xl shadow-sm hover:shadow-md transition"
                            >
                                {/* Top row */}
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold">Mesa {order.tableNumber}</h3>
                                        <p className="text-xs text-muted-foreground">{order.id}</p>
                                    </div>

                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm">{formatTime(order.createdAt)}</span>
                                    </div>
                                </div>

                                {/* Estado */}
                                <Badge
                                    variant={cfg.variant}
                                    className="text-sm px-3 py-1.5 mb-4 font-semibold"
                                >
                                    {cfg.label}
                                </Badge>

                                {/* Items */}
                                <div className="space-y-2 mb-5">
                                    {order.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 rounded-lg border bg-muted/40"
                                        >
                                            <p className="font-semibold">{item.quantity}× {item.menuItem.name}</p>
                                            {item.menuItem.description && (
                                                <p className="text-xs text-muted-foreground">{item.menuItem.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Botón */}
                                {cfg.button && cfg.next && (
                                    <Button
                                        className="w-full font-semibold bg-primary hover:bg-primary/90"
                                        onClick={() => updateOrderStatus(order.id, cfg.next! as OrderStatus)}
                                    >
                                        {cfg.button}
                                    </Button>
                                )}
                            </Card>
                        );
                    })}
                </div>

                {/* Empty state */}
                {active.length === 0 && (
                    <p className="text-center text-muted-foreground py-10">No hay pedidos activos</p>
                )}
            </section>

            {/* COMPLETADOS */}
            {completed.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold mb-4">Completados</h2>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                        {completed.map(order => {
                            console.log(order)
                            const cfg = getStatusConfig(order.status);
                            return (
                                <Card
                                    key={order.id}
                                    className={`p-4 border-2 rounded-xl ${cfg.variant}`}
                                >
                                    <h3 className="font-bold">Mesa {order.tableNumber}</h3>
                                    <Badge
                                        variant={cfg.variant}
                                        className="text-xs mb-2"
                                    >
                                        {cfg.label}
                                    </Badge>
                                </Card>
                            );
                        })}
                    </div>
                </section>
            )}

        </section>
    );
};

export default Kitchen;
