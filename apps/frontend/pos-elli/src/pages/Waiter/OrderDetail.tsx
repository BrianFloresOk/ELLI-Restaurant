import { useState } from "react";
import { Minus, Plus, Trash2, CreditCard } from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";

export interface MenuItem {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    description?: string;
}

const menuItems: MenuItem[] = [
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

const OrderDetail = () => {
/*     const { id } = useParams();
    const navigate = useNavigate(); */

    const [orderItems, setOrderItems] = useState([
        { menuItem: menuItems[0], quantity: 2 },
        { menuItem: menuItems[1], quantity: 1 },
        { menuItem: menuItems[6], quantity: 2 },
    ]);

    const subtotal = orderItems.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
    );

    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    const updateQuantity = (index: number, change: number) => {
        const newItems = [...orderItems];
        newItems[index].quantity = Math.max(1, newItems[index].quantity + change);
        setOrderItems(newItems);
    };

    const removeItem = (index: number) => {
        const newItems = orderItems.filter((_, i) => i !== index);
        setOrderItems(newItems);
        alert("Producto eliminado del pedido");
    };

/*     const handleCheckout = () => {
        navigate(`/checkout/${id}`);
    }; */

    return (
        <section>
            <div className="p-8 max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Pedido — Mesa  "5"
                        </h1>
                        <Badge variant="destructive" className="mt-2">
                            En Preparación
                        </Badge>
                    </div>

                    <Button variant="outline">
                        Volver
                    </Button>
                </div>

                {/* Items */}
                <Card
                    title="Productos"
                    className="space-y-4"
                >

                    <div className="space-y-4">
                        {orderItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 rounded-xl bg-muted/40 border border-border/40"
                            >
                                <img
                                    src={item.menuItem.image}
                                    alt={item.menuItem.name}
                                    className="w-16 h-16 rounded-lg object-cover shadow"
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold capitalize">
                                        {item.menuItem.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        ${item.menuItem.price.toFixed(2)}
                                    </p>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center gap-3">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => updateQuantity(index, -1)}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>

                                    <span className="w-8 text-center font-medium">
                                        {item.quantity}
                                    </span>

                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => updateQuantity(index, 1)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Subtotal by item */}
                                <div className="text-right min-w-[90px]">
                                    <p className="font-bold tracking-tight">
                                        ${(item.menuItem.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>

                                {/* Remove */}
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => removeItem(index)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {orderItems.length === 0 && (
                        <div className="text-center py-10 text-muted-foreground">
                            No hay productos en este pedido
                        </div>
                    )}
                </Card>

                {/* Totals */}
                <Card className="space-y-4">
                    <div className="flex justify-between text-lg">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-lg">
                        <span className="text-muted-foreground">IVA (15%):</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>

                    <div className="h-px bg-border/70" />

                    <div className="flex justify-between text-2xl">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-accent">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </Card>

                {/* Actions */}
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        className="flex-1"
                       
                    >
                        Agregar Más Productos
                    </Button>

                    <Button
                        variant="accent"
                        className="flex-1 gap-2 text-base py-6"
                    >
                        <CreditCard className="w-5 h-5" />
                        Proceder al Cobro
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default OrderDetail;
