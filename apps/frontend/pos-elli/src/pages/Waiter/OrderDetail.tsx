import { useState } from "react";
import { useParams } from "react-router-dom";
import { Clock, Plus, Minus, Trash2, Utensils, Users, User, Receipt, ChefHat } from "lucide-react";

import { Card } from "../../components/ui/Card";
import Badge, { type BadgeVariant } from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { LoadingSpinnerWithText } from "../../components/ui/LoadingSpinner";

import { useOrder, useCreateOrder, useCloseOrder, useAddOrderItem, useSendToKitchen } from "../../hooks/useOrder";
import { useAuth } from "../../hooks/useAuthContext";

import Swal from "sweetalert2";
import MenuEmbed from "../../components/containers/MenuEmbed";

export default function OrderDetailPage() {
    const { id } = useParams();
    const tableId = Number(id);

    const { user } = useAuth();

    const { order, loading, error, refetch } = useOrder(id || "");
    const { createOrder } = useCreateOrder();
    const { closeOrder } = useCloseOrder();
    const { addItem } = useAddOrderItem();

    const [openMenu, setOpenMenu] = useState(false);
    const { sendToKitchen } = useSendToKitchen()

    const handleCreateOrder = async () => {
        if (!user) return;

        const response = await createOrder({
            tableId,
            waiterId: user.id,
        });

        if (response?.success) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Pedido creado correctamente",
                showConfirmButton: false,
                timer: 1500,
            });

            refetch();
        } else {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "No se pudo crear el pedido",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleCloseOrder = async (orderId: string) => {
        const result = await Swal.fire({
            title: '¿Cerrar pedido?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF9442',
            cancelButtonColor: '#697282',
            confirmButtonText: 'Sí, cerrar',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;

        const response = await closeOrder(orderId);

        if (response?.success) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Pedido cerrado",
                showConfirmButton: false,
                timer: 1500,
            });

            refetch();
        } else {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Error al cerrar el pedido",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleSendToKitchen = async (orderId: string) => {
        const result = await Swal.fire({
            title: '¿Enviar a cocina?',
            text: 'El pedido será enviado al sector de cocina para su preparación',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#FF9442',
            cancelButtonColor: '#697282',
            confirmButtonText: 'Sí, enviar',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;

        try {
            if (!user) return;

            console.log(user.id)

            const response = await sendToKitchen(orderId, user.id)
            if (response.success) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Pedido enviado a cocina",
                    showConfirmButton: false,
                    timer: 1500,
                });

                refetch();
            } else {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: "Error al enviar a cocina",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }

        } catch (error) {
            console.log(error)
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Error al enviar a cocina",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleAddProduct = async (productId: number) => {
        if (!order) return;

        const response = await addItem(order.id, productId);

        if (response?.success) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Producto añadido",
                showConfirmButton: false,
                timer: 1200,
            });

            refetch();
            setOpenMenu(false);
        } else {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Error al añadir",
                showConfirmButton: false,
                timer: 1200,
            });
        }
    };

    const handleUpdateQuantity = async (productId: number, quantity: number) => {
        const response = await addItem(order.id, productId, quantity);

        if (response?.success) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: quantity === 0 ? "info" : "success",
                title: quantity === 0 ? "Producto eliminado" : "Cantidad actualizada",
                showConfirmButton: false,
                timer: 1200,
            });

            refetch();
        } else {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Error al actualizar",
                showConfirmButton: false,
                timer: 1200,
            });
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canSendToKitchen = (order: { status: string; items: any[]; }) => {
        return order.status === "OPEN" &&
            order.items.length > 0 &&
            order.items.some((item) => item.status === "PENDING");
    };

    const getOrderProgress = (order: any) => {
        const totalItems = order.items.length;
        const completedItems = order.items.filter((item: any) =>
            item.status === "COMPLETED" || item.status === "IN_PROGRESS"
        ).length;

        return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    };

    if (loading) return <LoadingSpinnerWithText text="Cargando pedido..." />;
    if (error) return <p className="p-4 text-destructive text-center">Error: {error}</p>;

    if (!order) {
        return (
            <div className="min-h-screen bg-background p-6">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Utensils className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold text-card-foreground">Mesa #{tableId}</h1>
                        <p className="text-muted-foreground">Pedido no iniciado</p>
                    </div>

                    <Card className="p-8 text-center rounded-2xl shadow-card border border-border">
                        <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold text-card-foreground mb-2">
                            Crear nuevo pedido
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Iniciá un pedido para esta mesa y comenzá a cargar productos.
                        </p>

                        <Button
                            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                            onClick={handleCreateOrder}
                        >
                            Crear pedido
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subtotal = order.items.reduce((total: number, item: any) => total + (Number(item.unitPrice) * item.quantity), 0);
    const tax = subtotal * 0.21;
    const total = subtotal + tax;
    const progress = getOrderProgress(order);

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header con información principal */}
                <Card className="p-6 rounded-2xl shadow-card border border-border">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-accent/10 p-3 rounded-xl">
                                <Utensils className="w-8 h-8 text-accent" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-card-foreground">
                                    Pedido #{order.id}
                                </h1>
                                <div className="flex items-center gap-4 mt-2 flex-wrap">
                                    <p className="text-muted-foreground flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {new Date(order.orderDate).toLocaleString('es-AR')}
                                    </p>
                                    <Badge
                                        variant={order.status === "OPEN" ? "success" as BadgeVariant : "default"}
                                        className="text-base px-3 py-1 font-semibold"
                                    >
                                        {order.status === "OPEN" ? "Abierto" : order.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Barra de progreso */}
                        {order.items.length > 0 && (
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Progreso</p>
                                    <p className="text-lg font-bold text-card-foreground">
                                        {Math.round(progress)}% completado
                                    </p>
                                </div>
                                <div className="w-24 bg-muted rounded-full h-2">
                                    <div
                                        className="bg-accent h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Tarjetas de información */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 rounded-2xl shadow-card border border-border">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Mesa</p>
                                <p className="text-xl font-bold text-card-foreground">#{order.tableId}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 rounded-2xl shadow-card border border-border">
                        <div className="flex items-center gap-3">
                            <div className="bg-accent/10 p-2 rounded-lg">
                                <User className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Mozo</p>
                                <p className="text-xl font-bold text-card-foreground">#{order.waiterId}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 rounded-2xl shadow-card border border-border">
                        <div className="flex items-center gap-3">
                            <div className="bg-success/10 p-2 rounded-lg">
                                <Receipt className="w-5 h-5 text-success" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Productos</p>
                                <p className="text-xl font-bold text-card-foreground">{order.items.length}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Botones de acción principales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                        onClick={() => setOpenMenu(true)}
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Añadir productos
                    </Button>

                    {canSendToKitchen(order) && (
                        <Button
                            className="bg-warning hover:bg-warning/90 text-warning-foreground font-semibold py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                            onClick={() => handleSendToKitchen(order.id)}
                        >
                            <ChefHat className="w-5 h-5 mr-2" />
                            Enviar a cocina
                        </Button>
                    )}
                </div>

                {/* Modal del menú */}
                {openMenu && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                        <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl shadow-elegant border border-border">
                            <div className="flex justify-between items-center p-6 border-b border-border">
                                <h2 className="text-2xl font-bold text-card-foreground">
                                    Menú - Mesa #{tableId}
                                </h2>
                                <button
                                    onClick={() => setOpenMenu(false)}
                                    className="p-2 hover:bg-muted rounded-xl transition-colors duration-200 text-muted-foreground hover:text-card-foreground"
                                >
                                    <Plus className="w-6 h-6 rotate-45" />
                                </button>
                            </div>

                            <div className="p-2">
                                <MenuEmbed onAddProduct={handleAddProduct} />
                            </div>
                        </Card>
                    </div>
                )}

                {/* Lista de productos */}
                <Card className="rounded-2xl shadow-card border border-border overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-card-foreground">
                                    Productos del pedido
                                </h2>
                                <p className="text-muted-foreground">
                                    {order.items.length} producto{order.items.length !== 1 ? 's' : ''} en el pedido
                                </p>
                            </div>

                            {/* Resumen de estados */}
                            {order.items.length > 0 && (
                                <div className="flex gap-3">
                                    <Badge variant="outline" className="bg-warning/10 text-warning-foreground">
                                        Pendientes: {order.items.filter((item: any) => item.status === "PENDING").length}
                                    </Badge>
                                    <Badge variant="outline" className="bg-accent/10 text-accent-foreground">
                                        En cocina: {order.items.filter((item: any) => item.status === "IN_PROGRESS").length}
                                    </Badge>
                                    <Badge variant="outline" className="bg-success/10 text-success-foreground">
                                        Listos: {order.items.filter((item: any) => item.status === "COMPLETED").length}
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {order.items.length === 0 ? (
                            <div className="text-center py-12">
                                <Utensils className="w-16 h-16 text-muted-foreground opacity-50 mx-auto mb-4" />
                                <p className="text-muted-foreground text-lg">
                                    No hay productos en el pedido
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Agregá productos usando el botón de arriba
                                </p>
                            </div>
                        ) : (
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            order.items.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card rounded-xl border border-border hover:shadow-sm transition-all duration-200 group gap-4"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-accent transition-colors duration-200">
                                                {item.product.name}
                                            </h3>
                                            <Badge
                                                variant={
                                                    item.status === "PENDING" ? "accent" as BadgeVariant :
                                                        item.status === "IN_PROGRESS" ? "outline" : "free"
                                                }
                                                className="text-sm"
                                            >
                                                {item.status === "PENDING" ? "Pendiente" :
                                                    item.status === "IN_PROGRESS" ? "En cocina" : "Listo"}
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground">
                                            ${Number(item.unitPrice).toLocaleString('es-AR')} c/u
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* Controles de cantidad */}
                                        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                                            <button
                                                onClick={() =>
                                                    handleUpdateQuantity(
                                                        item.productId,
                                                        Math.max(item.quantity - 1, 0)
                                                    )
                                                }
                                                className="p-2 hover:bg-muted/80 text-card-foreground rounded-lg transition-all duration-200"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>

                                            <span className="font-bold text-lg w-8 text-center text-card-foreground">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    handleUpdateQuantity(item.productId, item.quantity + 1)
                                                }
                                                className="p-2 hover:bg-muted/80 text-card-foreground rounded-lg transition-all duration-200"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Precio y eliminar */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl font-bold text-accent min-w-20 text-right">
                                                ${(Number(item.unitPrice) * item.quantity).toLocaleString('es-AR')}
                                            </span>

                                            <button
                                                onClick={() => handleUpdateQuantity(item.productId, 0)}
                                                className="p-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Totales */}
                    {order.items.length > 0 && (
                        <div className="border-t border-border p-6 bg-muted/30 space-y-3">
                            <div className="flex justify-between text-lg">
                                <span className="text-muted-foreground">Subtotal:</span>
                                <span className="font-semibold text-card-foreground">
                                    ${subtotal.toLocaleString('es-AR')}
                                </span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="text-muted-foreground">IVA (21%):</span>
                                <span className="font-semibold text-card-foreground">
                                    ${tax.toLocaleString('es-AR')}
                                </span>
                            </div>
                            <div className="flex justify-between text-2xl pt-3 border-t border-border">
                                <span className="font-bold text-card-foreground">Total:</span>
                                <span className="font-bold text-accent">
                                    ${total.toLocaleString('es-AR')}
                                </span>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Botón de cerrar pedido */}
                {order.status === "OPEN" && (
                    <Button
                        className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                        onClick={() => handleCloseOrder(order.id)}
                    >
                        Cerrar Pedido
                    </Button>
                )}
            </div>
        </div>
    );
}