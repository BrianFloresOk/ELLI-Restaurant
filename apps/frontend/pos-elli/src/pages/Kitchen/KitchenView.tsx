import { useState } from 'react';
import { ChefHat, Clock, Utensils, Users, CheckCircle, PlayCircle, Filter } from 'lucide-react';
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { LoadingSpinnerWithText } from "../../components/ui/LoadingSpinner";
import Swal from 'sweetalert2';
import { useViewAllComandsKitchen } from '../../hooks/useKitchen';
import { useOrderAsReady } from '../../hooks/useOrder';
import { useAuth } from '../../hooks/useAuthContext';

// Tipos basados en la estructura de la API
interface OrderItem {
    product: string;
    quantity: number;
    subtotal: number;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

interface KitchenOrder {
    orderNumber: number;
    tableId: number;
    waiter: string;
    status: "OPEN";
    orderDate: string;
    orderItems: OrderItem[];
}

const KitchenView = () => {
    const { orders, error, loading, refetch } = useViewAllComandsKitchen();
    const { sendHall, loading: updateLoading } = useOrderAsReady();
    const { user } = useAuth();
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'IN_PROGRESS'>('ALL');

    const handleUpdateOrderStatus = async (orderNumber: number) => {
        // Determinar el estado actual de la orden
        const order = orders?.find(o => o.orderNumber === orderNumber);
        if (!order) return;

        const hasPending = order.orderItems.some(item => item.status === 'PENDING');
        const hasInProgress = order.orderItems.some(item => item.status === 'IN_PROGRESS');

        let confirmationMessage = '';
        let newStatus = '';

        if (hasPending) {
            // Si hay items pendientes, cambiar a "En preparación"
            confirmationMessage = `¿Comenzar a preparar la orden #${orderNumber}?`;
            newStatus = 'En preparación';
        } else if (hasInProgress) {
            // Si hay items en preparación, marcar como "Lista para servir"
            confirmationMessage = `¿Marcar la orden #${orderNumber} como lista para servir?`;
            newStatus = 'Lista para servir';
        } else {
            // Todos los items están completados
            return;
        }

        const result = await Swal.fire({
            title: 'Confirmar cambio',
            text: confirmationMessage,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#FF9442',
            cancelButtonColor: '#697282',
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;

        try {
            if (!user) throw new Error("No hay un usuario logueado");

            const response = await sendHall(orderNumber.toString(), user.id);
            if (response.success) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: `Orden #${orderNumber} actualizada: ${newStatus}`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                refetch();
            } else {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: "Error al actualizar el estado",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Error al actualizar el estado",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };

    const getStatusConfig = (status: OrderItem['status']) => {
        switch (status) {
            case 'PENDING':
                return {
                    label: 'Pendiente',
                    styles: 'bg-warning/20 text-warning-foreground border-warning/30',
                    icon: Clock,
                };
            case 'IN_PROGRESS':
                return {
                    label: 'En preparación',
                    styles: 'bg-accent/20 text-accent-foreground border-accent/30',
                    icon: PlayCircle,
                };
            case 'COMPLETED':
                return {
                    label: 'Completado',
                    styles: 'bg-success/20 text-success-foreground border-success/30',
                    icon: CheckCircle,
                };
            default:
                return {
                    label: status,
                    styles: 'bg-muted text-muted-foreground border-border',
                    icon: Clock,
                };
        }
    };

    const getOrderStatusConfig = (order: KitchenOrder) => {
        const hasPending = order.orderItems.some(item => item.status === 'PENDING');
        const hasInProgress = order.orderItems.some(item => item.status === 'IN_PROGRESS');
        const allCompleted = order.orderItems.every(item => item.status === 'COMPLETED');

        if (hasPending) {
            return {
                label: 'Pendiente',
                styles: 'bg-warning/20 text-warning-foreground border-warning/30',
                buttonText: 'Comenzar preparación',
                buttonVariant: 'accent' as const,
                canUpdate: true
            };
        } else if (hasInProgress) {
            return {
                label: 'En cocina',
                styles: 'bg-accent/20 text-accent-foreground border-accent/30',
                buttonText: 'Marcar como lista',
                buttonVariant: 'success' as const,
                canUpdate: true
            };
        } else if (allCompleted) {
            return {
                label: 'Lista para servir',
                styles: 'bg-success/20 text-success-foreground border-success/30',
                buttonText: null,
                buttonVariant: null,
                canUpdate: false
            };
        } else {
            return {
                label: 'En proceso',
                styles: 'bg-muted text-muted-foreground border-border',
                buttonText: null,
                buttonVariant: null,
                canUpdate: false
            };
        }
    };

    const getOrderPriority = (order: KitchenOrder) => {
        const hasPending = order.orderItems.some(item => item.status === 'PENDING');
        const hasInProgress = order.orderItems.some(item => item.status === 'IN_PROGRESS');

        if (hasPending) return 1;
        if (hasInProgress) return 2;
        return 3;
    };

    const filteredAndSortedOrders = orders?.filter((order) => {
        if (filter === 'ALL') return true;
        if (filter === 'PENDING') {
            return order.orderItems.some(item => item.status === 'PENDING');
        }
        if (filter === 'IN_PROGRESS') {
            return order.orderItems.some(item => item.status === 'IN_PROGRESS');
        }
        return true;
    }).sort((a, b) => {
        const priorityA = getOrderPriority(a);
        const priorityB = getOrderPriority(b);

        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }

        return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
    });

    // Estadísticas
    const stats = {
        total: orders?.length || 0,
        pending: orders?.filter(order =>
            order.orderItems.some(item => item.status === 'PENDING')
        ).length || 0,
        inProgress: orders?.filter(order =>
            order.orderItems.some(item => item.status === 'IN_PROGRESS')
        ).length || 0,
        completed: orders?.filter(order =>
            order.orderItems.every(item => item.status === 'COMPLETED')
        ).length || 0,
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background p-6">
                <div className="max-w-7xl mx-auto">
                    <LoadingSpinnerWithText text="Cargando órdenes de cocina..." />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background p-6">
                <div className="max-w-7xl mx-auto text-center">
                    <Card className="p-8 rounded-2xl shadow-card border border-border">
                        <ChefHat className="w-16 h-16 text-destructive mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-card-foreground mb-2">Error</h2>
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <Button onClick={refetch} className="bg-accent hover:bg-accent/90">
                            Reintentar
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-accent/10 p-4 rounded-2xl">
                            <ChefHat className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-card-foreground">Sector de Cocina</h1>
                            <p className="text-muted-foreground">
                                Gestión de comandas y preparación de pedidos
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={refetch}
                        disabled={updateLoading}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                    >
                        Actualizar
                    </Button>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4 rounded-2xl shadow-card border border-border">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-card-foreground">{stats.total}</div>
                            <div className="text-sm text-muted-foreground">Total Órdenes</div>
                        </div>
                    </Card>
                    <Card className="p-4 rounded-2xl shadow-card border border-border bg-warning">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-warning-foreground">{stats.pending}</div>
                            <div className="text-sm text-muted-foreground">Pendientes</div>
                        </div>
                    </Card>
                    <Card className="p-4 rounded-2xl shadow-card border border-border bg-accent/10">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-accent">{stats.inProgress}</div>
                            <div className="text-sm text-muted-foreground">En Cocina</div>
                        </div>
                    </Card>
                    <Card className="p-4 rounded-2xl shadow-card border border-border bg-success">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-success-foreground">{stats.completed}</div>
                            <div className="text-sm text-accent-foreground">Listas para servir</div>
                        </div>
                    </Card>
                </div>

                <Card className="p-4 rounded-2xl shadow-card border border-border">
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Filter className="w-4 h-4" />
                            <span className="font-medium">Filtrar:</span>
                        </div>
                        {(['ALL', 'PENDING', 'IN_PROGRESS'] as const).map((filterType) => (
                            <button
                                key={filterType}
                                onClick={() => setFilter(filterType)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm border ${filter === filterType
                                    ? 'bg-accent text-accent-foreground border-accent shadow-md'
                                    : 'bg-card text-card-foreground border-border hover:bg-muted hover:shadow-md'
                                    }`}
                            >
                                {filterType === 'ALL' ? 'Todas' :
                                    filterType === 'PENDING' ? 'Pendientes' : 'En Cocina'}
                            </button>
                        ))}
                    </div>
                </Card>

                <div className="space-y-4">
                    {filteredAndSortedOrders?.length === 0 ? (
                        <Card className="p-12 text-center rounded-2xl shadow-card border border-border">
                            <ChefHat className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-semibold text-card-foreground mb-2">
                                No hay órdenes {filter !== 'ALL' ? `con estado ${filter.toLowerCase()}` : ''}
                            </h3>
                            <p className="text-muted-foreground">
                                {filter === 'ALL'
                                    ? 'Todas las órdenes están completadas o no hay órdenes activas.'
                                    : 'No hay órdenes con items en este estado.'
                                }
                            </p>
                        </Card>
                    ) : (
                        filteredAndSortedOrders?.map((order) => {
                            const orderStatusConfig = getOrderStatusConfig(order);

                            return (
                                <Card
                                    key={order.orderNumber}
                                    className="rounded-2xl shadow-card border border-border overflow-hidden"
                                >
                                    <div className="p-6 border-b border-border bg-card">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-primary/10 p-3 rounded-xl">
                                                    <Utensils className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-card-foreground">
                                                        Orden #{order.orderNumber}
                                                    </h2>
                                                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <Users className="w-4 h-4" />
                                                            Mesa #{order.tableId}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <Clock className="w-4 h-4" />
                                                            {new Date(order.orderDate).toLocaleString('es-AR')}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Mozo: {order.waiter}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Badge className={`${orderStatusConfig.styles} text-lg px-4 py-2 font-semibold`}>
                                                    {orderStatusConfig.label}
                                                </Badge>
                                                {orderStatusConfig.buttonText && (
                                                    <Button
                                                        onClick={() => handleUpdateOrderStatus(order.orderNumber)}
                                                        disabled={updateLoading}
                                                        className={`
                                                            ${orderStatusConfig.buttonVariant === 'accent' ? 'bg-accent hover:bg-accent/90 text-accent-foreground' :
                                                                orderStatusConfig.buttonVariant === 'success' ? 'bg-success hover:bg-success/90 text-success-foreground' : ''}
                                                            font-semibold shadow-sm hover:shadow-md transition-all duration-200
                                                        `}
                                                    >
                                                        {orderStatusConfig.buttonText}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid gap-3">
                                            {order.orderItems.map((item, index) => {
                                                const statusConfig = getStatusConfig(item.status);
                                                const StatusIcon = statusConfig.icon;

                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border"
                                                    >
                                                        <div className="flex items-center gap-3 flex-1">
                                                            <Badge className={statusConfig.styles + " text-sm"}>
                                                                <StatusIcon className="w-3 h-3 mr-1" />
                                                                {statusConfig.label}
                                                            </Badge>
                                                            <div>
                                                                <h3 className="font-semibold text-card-foreground">
                                                                    {item.product}
                                                                </h3>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Cantidad: {item.quantity}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-card-foreground">
                                                                ${item.subtotal.toLocaleString('es-AR')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default KitchenView;