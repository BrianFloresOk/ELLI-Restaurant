import { useState } from "react";
import { Clock, ChefHat } from "lucide-react";
import Badge from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import type { MenuItem, Order, OrderStatus } from "../../types";

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
    {
        id: "5",
        name: "Carpaccio de Res",
        category: "Entradas",
        price: 18.00,
        image: "/placeholder.svg",
        description: "Láminas finas de res con rúcula y parmesano"
    },
    {
        id: "6",
        name: "Langosta Thermidor",
        category: "Pescados",
        price: 65.00,
        image: "/placeholder.svg",
        description: "Langosta gratinada con salsa de brandy"
    },
    {
        id: "7",
        name: "Tiramisu",
        category: "Postres",
        price: 12.00,
        image: "/placeholder.svg",
        description: "Postre italiano con café y mascarpone"
    },
    {
        id: "8",
        name: "Crème Brûlée",
        category: "Postres",
        price: 14.00,
        image: "/placeholder.svg",
        description: "Crema de vainilla con azúcar caramelizada"
    },
    {
        id: "9",
        name: "Vino Tinto Reserva",
        category: "Bebidas",
        price: 35.00,
        image: "/placeholder.svg",
        description: "Copa de vino tinto reserva especial"
    },
    {
        id: "10",
        name: "Agua Mineral",
        category: "Bebidas",
        price: 5.00,
        image: "/placeholder.svg",
        description: "Agua mineral premium 750ml"
    }
];

const Kitchen = () => {
    const [orders, setOrders] = useState<Order[]>([
        {
            id: "order-001",
            tableNumber: 3,
            status: "pending",
            items: [
                { menuItem: menuItems[0], quantity: 2 },
                { menuItem: menuItems[6], quantity: 1 },
            ],
            subtotal: 45.97,
            tax: 6.90,
            total: 52.87,
            createdAt: new Date(Date.now() - 10 * 60000),
        },
        {
            id: "order-002",
            tableNumber: 5,
            status: "preparing",
            items: [
                { menuItem: menuItems[2], quantity: 1 },
                { menuItem: menuItems[3], quantity: 1 },
            ],
            subtotal: 27.98,
            tax: 4.20,
            total: 32.18,
            createdAt: new Date(Date.now() - 25 * 60000),
        },
        {
            id: "order-003",
            tableNumber: 7,
            status: "pending",
            items: [
                { menuItem: menuItems[1], quantity: 3 },
                { menuItem: menuItems[7], quantity: 2 },
            ],
            subtotal: 52.95,
            tax: 7.94,
            total: 60.89,
            createdAt: new Date(Date.now() - 5 * 60000),
        },
        {
            id: "order-004",
            tableNumber: 2,
            status: "served",
            items: [
                { menuItem: menuItems[4], quantity: 1 },
                { menuItem: menuItems[8], quantity: 1 },
            ],
            subtotal: 22.98,
            tax: 3.45,
            total: 26.43,
            createdAt: new Date(Date.now() - 40 * 60000),
        },
    ]);

    const getStatusConfig = (status: OrderStatus) => {
        switch (status) {
            case "pending":
                return {
                    label: "Pendiente",
                    styles: "bg-warning/20 text-warning-foreground border-warning/30",
                    button: "Marcar en Preparación",
                    next: "preparing" as OrderStatus,
                };

            case "preparing":
                return {
                    label: "En Preparación",
                    styles: "bg-accent/20 text-accent-foreground border-accent/30",
                    button: "Marcar Completado",
                    next: "served" as OrderStatus,
                };

            case "served":
                return {
                    label: "Completado",
                    styles: "bg-success/20 text-success-foreground border-success/30",
                    button: null,
                    next: null,
                };

            default:
                return {
                    label: "Pagado",
                    styles: "bg-muted text-muted-foreground border-border",
                    button: null,
                    next: null,
                };
        }
    };

    // --- Handlers ---
    const updateOrderStatus = (id: string, newStatus: OrderStatus) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
        );

        alert(`Pedido actualizado a: ${getStatusConfig(newStatus).label}`);
    };

    const formatTime = (date: Date) => {
        const diff = Date.now() - date.getTime();
        const mins = Math.floor(diff / 60000);

        if (mins < 60) return `Hace ${mins} min`;

        return `${date.getHours().toString().padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
    };

    const active = orders.filter((o) => o.status === "pending" || o.status === "preparing");
    const completed = orders.filter((o) => o.status === "served");

    // --- UI Mejorada ---
    return (
        <section className="min-h-screen bg-background">
            {/* Contenedor principal */}
            <div className="p-6 space-y-8 max-w-7xl mx-auto">
                {/* Header mejorado */}
                <div className="flex items-center gap-4 p-6 bg-card rounded-2xl shadow-elegant">
                    <div className="bg-accent/10 p-4 rounded-xl">
                        <ChefHat className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-card-foreground">Vista de Cocina</h1>
                        <p className="text-muted-foreground">
                            Gestión de pedidos pendientes y en preparación
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-center p-3 bg-warning/10 rounded-lg">
                            <div className="text-2xl font-bold text-warning-foreground">
                                {orders.filter(o => o.status === "pending").length}
                            </div>
                            <div className="text-sm text-muted-foreground">Pendientes</div>
                        </div>
                        <div className="text-center p-3 bg-accent/10 rounded-lg">
                            <div className="text-2xl font-bold text-accent">
                                {orders.filter(o => o.status === "preparing").length}
                            </div>
                            <div className="text-sm text-muted-foreground">En Cocina</div>
                        </div>
                    </div>
                </div>

                {/* Active Orders - Mejorado */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-card-foreground flex items-center gap-3">
                            Pedidos Activos
                            <Badge variant="secondary" className="text-lg px-3 py-1">
                                {active.length}
                            </Badge>
                        </h2>
                    </div>

                    {/* Grid de pedidos activos */}
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {active.map((order) => {
                            const cfg = getStatusConfig(order.status);

                            return (
                                <Card
                                    key={order.id}
                                    className="p-6 rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 border border-border bg-card group"
                                >
                                    {/* Header de la card */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-card-foreground">
                                                Mesa {order.tableNumber}
                                            </h3>
                                            <p className="text-sm text-muted-foreground font-mono">
                                                {order.id.toUpperCase()}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="w-4 h-4" />
                                            {formatTime(order.createdAt)}
                                        </div>
                                    </div>

                                    {/* Badge de estado */}
                                    <Badge
                                        className={`${cfg.styles} text-base px-3 py-1.5 mb-4 font-semibold border`}
                                    >
                                        {cfg.label}
                                    </Badge>

                                    {/* Items del pedido */}
                                    <div className="space-y-3 mb-6">
                                        {order.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="bg-muted/50 p-3 rounded-xl border border-border/50 group-hover:border-border/70 transition-colors"
                                            >
                                                <p className="font-semibold text-card-foreground text-base">
                                                    {item.quantity}x {item.menuItem.name}
                                                </p>
                                                {item.menuItem.description && (
                                                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                                        {item.menuItem.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Botón de acción */}
                                    {cfg.button && cfg.next && (
                                        <Button
                                            variant="default"
                                            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                            onClick={() => updateOrderStatus(order.id, cfg.next!)}
                                        >
                                            {cfg.button}
                                        </Button>
                                    )}
                                </Card>
                            );
                        })}
                    </div>

                    {/* Estado vacío */}
                    {active.length === 0 && (
                        <Card className="p-12 text-center bg-card rounded-2xl shadow-card border border-border">
                            <ChefHat className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                            <h3 className="text-xl font-semibold text-card-foreground mb-2">
                                ¡Cocina al día!
                            </h3>
                            <p className="text-muted-foreground">
                                No hay pedidos activos en este momento
                            </p>
                        </Card>
                    )}
                </section>

                {/* Completed Orders - Mejorado */}
                {completed.length > 0 && (
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-card-foreground flex items-center gap-3">
                            Pedidos Completados
                            <Badge variant="secondary" className="text-lg px-3 py-1">
                                {completed.length}
                            </Badge>
                        </h2>

                        {/* Grid de pedidos completados */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                            {completed.map((order) => {
                                const cfg = getStatusConfig(order.status);

                                return (
                                    <Card
                                        key={order.id}
                                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${cfg.styles}`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-lg font-bold">Mesa {order.tableNumber}</h3>
                                        </div>

                                        <Badge className={`${cfg.styles} text-sm mb-2`}>
                                            {cfg.label}
                                        </Badge>

                                        <p className="text-sm text-muted-foreground mb-1">
                                            {order.items.length} plato{order.items.length > 1 ? 's' : ''}
                                        </p>
                                        <p className="text-xs flex items-center gap-1 text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            {formatTime(order.createdAt)}
                                        </p>
                                    </Card>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
        </section>
    );
};

export default Kitchen;