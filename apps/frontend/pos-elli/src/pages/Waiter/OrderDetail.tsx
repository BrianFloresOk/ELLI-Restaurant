import { Clock, User, ChefHat } from "lucide-react";
import Badge, { type BadgeVariant } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";


interface OrderItem {
    product: string;
    quantity: number;
    subtotal: number;
    status: string;
}

interface OrderDetailProps {
    orderNumber: number;
    tableId: number;
    waiter: string;
    status: string;
    orderDate: string;
    orderItems: OrderItem[];
}

export default function OrderDetailPage() {

    const { id } = useParams()
    console.log(id)

    // Mapeo visual de estados del pedido
    const statusMap: Record<string, { label: string; variant: BadgeVariant }> = {
        "PENDING": { label: "Pendiente", variant: "destructive" },
        "IN_PROGRESS": { label: "En preparación", variant: "secondary" },
        "COMPLETED": { label: "Completado", variant: "default" },
        "IS_PAID": { label: "Pagado", variant: "outline" },
    };

    // Formateo fecha
    const formatDate = (d: string) =>
        new Date(d).toLocaleString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

    const total = orderItems.reduce((acc, item) => acc + item.subtotal, 0);

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            {/* HEADER */}
            <div className="flex items-center gap-4 bg-card p-6 rounded-2xl shadow-elegant">
                <div className="bg-primary/10 p-4 rounded-xl">
                    <ChefHat className="w-8 h-8 text-primary" />
                </div>

                <div className="flex-1">
                    <h1 className="text-3xl font-bold">Detalle del Pedido #{orderNumber}</h1>
                    <p className="text-muted-foreground">
                        Mesa {tableId} — Atendido por {waiter}
                    </p>
                </div>

                <Badge
                    variant={statusMap[status]?.variant || "outline"}
                    className="text-lg px-4 py-1.5 rounded-xl"
                >
                    {statusMap[status]?.label || "Desconocido"}
                </Badge>
            </div>

            {/* INFO GENERAL */}
            <Card className="p-6 rounded-2xl shadow-card bg-card border border-border">
                <div className="grid sm:grid-cols-2 gap-6 text-lg">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <p><span className="font-semibold">Mozo:</span> {waiter}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <p>
                            <span className="font-semibold">Fecha:</span> {formatDate(orderDate)}
                        </p>
                    </div>
                </div>
            </Card>

            {/* ITEMS DEL PEDIDO */}
            <Card className="p-6 rounded-2xl shadow-card bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Productos</h2>

                <div className="space-y-4">
                    {orderItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-start bg-muted/30 p-4 rounded-xl border border-border/40"
                        >
                            <div>
                                <p className="text-lg font-semibold">{item.product}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Cantidad: {item.quantity}
                                </p>
                            </div>

                            <div className="text-end">
                                <Badge
                                    variant={
                                        item.status === "COMPLETED"
                                            ? "default"
                                            : "secondary"
                                    }
                                    className="mb-2"
                                >
                                    {item.status === "COMPLETED" ? "Listo" : item.status}
                                </Badge>

                                <p className="text-xl font-bold">
                                    ${item.subtotal.toLocaleString("es-AR")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* TOTAL */}
                <div className="flex justify-between items-center mt-8 p-4 bg-primary/10 rounded-xl">
                    <span className="text-xl font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                        ${total.toLocaleString("es-AR")}
                    </span>
                </div>
            </Card>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex justify-end gap-4">
                <Button variant="secondary" className="px-6 py-3 text-lg rounded-xl">
                    Volver
                </Button>

                <Button className="px-6 py-3 text-lg rounded-xl">
                    Imprimir Ticket
                </Button>
            </div>
        </div>
    );
}
