import { GridTableHall } from "../../components/containers/GridTableHall";
import Badge from "../../components/ui/Badge";
import { LoadingSpinnerWithText } from "../../components/ui/LoadingSpinner";
import { TableHall } from "../../components/ui/TableHall";
import { useTables } from "../../hooks/useTables";

export default function Hall() {

    const { loading, tables } = useTables()

    if (loading) return <LoadingSpinnerWithText text="Cargando.." size="md" />

return (
    <div className="mb-8 p-6 bg-background rounded-lg shadow-sm">

        <h1 className="text-3xl font-bold mb-2 text-foreground">Gestión de Mesas</h1>
        <p className="text-muted-foreground mb-4">Selecciona una mesa para crear o ver su pedido</p>
        <div className="flex gap-4 mb-8">
            <Badge
                variant="outline"
                className="px-4 py-2 text-base border-border bg-card text-card-foreground dark:bg-card/70"
            >
                <span className="w-3 h-3 rounded-full bg-success mr-2 inline-block"></span>
                Libres
            </Badge>
            <Badge
                variant="outline"
                className="px-4 py-2 text-base border-border bg-card text-card-foreground dark:bg-card/70"
            >
                <span className="w-3 h-3 rounded-full bg-destructive mr-2 inline-block"></span>
                Ocupadas
            </Badge>
            <Badge
                variant="outline"
                className="px-4 py-2 text-base border-border bg-card text-card-foreground dark:bg-card/70"
            >
                Total: {tables.length}
            </Badge>
        </div>

        <section>
            <GridTableHall columns={4}>
                {
                    tables.map((table, index) => (
                        <TableHall 
                            key={index}
                            number={table.id}
                            status={table.status}
                            guests={table.capacity}
                        />
                    ))
                }
            </GridTableHall>
        </section>
    </div>
)
}