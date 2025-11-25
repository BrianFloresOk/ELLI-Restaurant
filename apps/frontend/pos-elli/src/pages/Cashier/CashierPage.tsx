import { useState } from 'react';
import { Search, Receipt, User, CreditCard, DollarSign, CheckCircle, Clock, Utensils } from 'lucide-react';
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { LoadingSpinnerWithText } from "../../components/ui/LoadingSpinner";
import Swal from 'sweetalert2';
import { useAuth } from "../../hooks/useAuthContext";
import { useRegisterPayment } from '../../hooks/usePayment';
import { useOrderDetails } from '../../hooks/useOrder';


const CashierView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentOrderId, setCurrentOrderId] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'TRANSFER'>('CASH');
    const { user } = useAuth();

    const { order: currentOrder, loading: orderLoading, error: orderError } = useOrderDetails(currentOrderId);
    const { loading: paymentLoading, error: paymentError, registerPayment } = useRegisterPayment();

    const handleSearchOrder = async () => {
        if (!searchTerm.trim()) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "warning",
                title: "Ingresá un número de orden",
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }

        setCurrentOrderId(searchTerm);
    };

    const handleProcessPayment = async () => {
        if (!currentOrder || !user) return;

        const totalAmount = currentOrder.orderItems.reduce((sum, item) => sum + item.subtotal, 0);

        const result = await Swal.fire({
            title: 'Confirmar pago',
            html: `
        <div class="text-left space-y-2">
          <p><strong>Orden:</strong> #${currentOrder.orderNumber}</p>
          <p><strong>Mesa:</strong> ${currentOrder.tableId}</p>
          <p><strong>Total:</strong> $${totalAmount.toLocaleString('es-AR')}</p>
          <p><strong>Método:</strong> ${getPaymentMethodLabel(paymentMethod)}</p>
        </div>
      `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#12A45D',
            cancelButtonColor: '#697282',
            confirmButtonText: 'Confirmar pago',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;

        const paymentData = {
            orderId: currentOrder.orderNumber,
            method: paymentMethod,
            amount: totalAmount,
            cashierId: user.id
        };

        const response = await registerPayment(paymentData);

        if (response?.success) {
            Swal.fire({
                title: '¡Pago exitoso!',
                text: `El pago de $${totalAmount.toLocaleString('es-AR')} fue registrado correctamente`,
                icon: 'success',
                confirmButtonColor: '#12A45D',
                confirmButtonText: 'Aceptar'
            });

            setCurrentOrderId('');
            setSearchTerm('');
        } else if (paymentError) {
            Swal.fire({
                title: 'Error en el pago',
                text: paymentError,
                icon: 'error',
                confirmButtonColor: '#FF5252',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'CLOSED':
                return {
                    label: 'Cerrada',
                    styles: 'bg-success/20 text-success-foreground border-success/30'
                };
            case 'OPEN':
                return {
                    label: 'Abierta',
                    styles: 'bg-warning/20 text-warning-foreground border-warning/30'
                };
            case 'PAID':
                return {
                    label: 'Pagada',
                    styles: 'bg-accent/20 text-accent-foreground border-accent/30'
                };
            default:
                return {
                    label: status,
                    styles: 'bg-muted text-muted-foreground border-border'
                };
        }
    };

    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case 'CASH': return 'Efectivo';
            case 'CARD': return 'Tarjeta';
            case 'TRANSFER': return 'Transferencia';
            default: return method;
        }
    };

    const getItemStatusConfig = (status: string) => {
        switch (status) {
            case 'IN_PROGRESS':
                return {
                    label: 'En preparación',
                    styles: 'bg-accent/20 text-accent-foreground border-accent/30'
                };
            case 'COMPLETED':
                return {
                    label: 'Completado',
                    styles: 'bg-success/20 text-success-foreground border-success/30'
                };
            case 'PENDING':
                return {
                    label: 'Pendiente',
                    styles: 'bg-warning/20 text-warning-foreground border-warning/30'
                };
            default:
                return {
                    label: status,
                    styles: 'bg-muted text-muted-foreground border-border'
                };
        }
    };

    const subtotal = currentOrder?.orderItems.reduce((sum, item) => sum + item.subtotal, 0) || 0;
    const tax = subtotal * 0.21;
    const total = subtotal + tax;

    if (orderError && currentOrderId) {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: orderError,
            showConfirmButton: false,
            timer: 3000,
        });
        setCurrentOrderId('');
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto space-y-6">

                <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-4 rounded-2xl">
                        <DollarSign className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-card-foreground">Caja</h1>
                        <p className="text-muted-foreground">
                            Buscar órdenes y registrar pagos
                        </p>
                    </div>
                </div>

                <Card className="p-6 rounded-2xl shadow-card border border-border">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Ingresá el número de orden..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearchOrder()}
                                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-card-foreground placeholder-muted-foreground text-lg"
                            />

                        </div>
                        <Button
                            onClick={handleSearchOrder}
                            disabled={orderLoading}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-32"
                        >
                            {orderLoading ? (
                                <LoadingSpinnerWithText text="Buscando..." />
                            ) : (
                                <>
                                    <Search className="w-5 h-5 mr-2" />
                                    Buscar
                                </>
                            )}
                        </Button>
                    </div>
                </Card>

                {currentOrder && (
                    <div className="space-y-6">

                        <Card className="rounded-2xl shadow-card border border-border overflow-hidden">
                            <div className="p-6 border-b border-border bg-card">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-xl">
                                            <Receipt className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-card-foreground">
                                                Orden #{currentOrder.orderNumber}
                                            </h2>
                                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                                <Clock className="w-4 h-4" />
                                                {new Date(currentOrder.orderDate).toLocaleString('es-AR')}
                                            </p>
                                        </div>
                                    </div>

                                    <Badge className={getStatusConfig(currentOrder.status).styles + " text-lg px-4 py-2 font-semibold"}>
                                        {getStatusConfig(currentOrder.status).label}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-muted p-2 rounded-lg">
                                            <Utensils className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Mesa</p>
                                            <p className="text-xl font-bold text-card-foreground">#{currentOrder.tableId}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="bg-muted p-2 rounded-lg">
                                            <User className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Mozo</p>
                                            <p className="text-xl font-bold text-card-foreground">{currentOrder.waiter}</p>
                                        </div>
                                    </div>
                                </div>

                                <Card className="p-4 bg-muted/30 border border-border/50">
                                    <h3 className="font-semibold text-card-foreground mb-3">Resumen</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Productos:</span>
                                            <span className="font-medium text-card-foreground">
                                                {currentOrder.orderItems.length}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Items totales:</span>
                                            <span className="font-medium text-card-foreground">
                                                {currentOrder.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                                            <span className="text-card-foreground">Total:</span>
                                            <span className="text-accent">${total.toLocaleString('es-AR')}</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Card>

                        <Card className="rounded-2xl shadow-card border border-border">
                            <div className="p-6 border-b border-border">
                                <h3 className="text-xl font-bold text-card-foreground">
                                    Productos de la orden
                                </h3>
                            </div>

                            <div className="p-6 space-y-4">
                                {currentOrder.orderItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-card rounded-xl border border-border"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-semibold text-lg text-card-foreground">
                                                    {item.product}
                                                </h4>
                                                <Badge className={getItemStatusConfig(item.status).styles + " text-sm"}>
                                                    {getItemStatusConfig(item.status).label}
                                                </Badge>
                                            </div>
                                            <p className="text-muted-foreground">
                                                Cantidad: {item.quantity} × ${(item.subtotal / item.quantity).toLocaleString('es-AR')}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xl font-bold text-accent">
                                                ${item.subtotal.toLocaleString('es-AR')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

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
                                    <span className="font-bold text-card-foreground">Total a pagar:</span>
                                    <span className="font-bold text-accent">
                                        ${total.toLocaleString('es-AR')}
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {currentOrder.status === 'CLOSED' && (
                            <Card className="rounded-2xl shadow-card border border-border p-6">
                                <h3 className="text-xl font-bold text-card-foreground mb-4">
                                    Procesar pago
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-card-foreground mb-3">
                                            Método de pago
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {(['CASH', 'CARD', 'TRANSFER'] as const).map((method) => (
                                                <button
                                                    key={method}
                                                    onClick={() => setPaymentMethod(method)}
                                                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${paymentMethod === method
                                                        ? 'border-accent bg-accent text-accent-foreground'
                                                        : 'border-border bg-card text-card-foreground hover:bg-muted'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {method === 'CASH' && <DollarSign className="w-5 h-5" />}
                                                        {method === 'CARD' && <CreditCard className="w-5 h-5" />}
                                                        {method === 'TRANSFER' && <Receipt className="w-5 h-5" />}
                                                        <span className="font-medium">{getPaymentMethodLabel(method)}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleProcessPayment}
                                        disabled={paymentLoading}
                                        className="w-full bg-success hover:bg-success/90 text-success-foreground font-semibold py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {paymentLoading ? (
                                            <LoadingSpinnerWithText text="Procesando..." />
                                        ) : (
                                            <>
                                                <CheckCircle className="w-6 h-6 mr-2" />
                                                Registrar pago - ${total.toLocaleString('es-AR')}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentOrder.status !== 'CLOSED' && (
                            <Card className="rounded-2xl shadow-card border border-border p-6 text-center">
                                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                                    Orden {currentOrder.status === 'OPEN' ? 'abierta' : 'en proceso'}
                                </h3>
                                <p className="text-muted-foreground">
                                    La orden debe estar cerrada para poder procesar el pago.
                                </p>
                            </Card>
                        )}
                    </div>
                )}

                {!currentOrder && !orderLoading && (
                    <Card className="rounded-2xl shadow-card border border-border p-12 text-center">
                        <Receipt className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold text-card-foreground mb-2">
                            Buscar orden
                        </h3>
                        <p className="text-muted-foreground">
                            Ingresá el número de orden para ver los detalles y procesar el pago.
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default CashierView;