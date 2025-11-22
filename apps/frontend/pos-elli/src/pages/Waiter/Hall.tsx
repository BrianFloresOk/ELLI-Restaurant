import Badge from "../../components/ui/Badge";

export default function Hall() {
    return (
        < div className="mb-8" >
            <h1 className="text-3xl font-bold mb-2">Gestión de Mesas</h1>
            <p className="text-muted-foreground mb-4">Selecciona una mesa para crear o ver su pedido</p>

            <div className="flex gap-4">
                <Badge variant="outline" className="px-4 py-2 text-base">
                    <span className="w-3 h-3 rounded-full bg-success mr-2 inline-block"></span>
                    Libres
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-base">
                    <span className="w-3 h-3 rounded-full bg-destructive mr-2 inline-block"></span>
                    Ocupadas
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-base">
                    Total: 8 mesas
                </Badge>
            </div>
        </div >
    )
}