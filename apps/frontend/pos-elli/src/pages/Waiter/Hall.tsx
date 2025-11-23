import { GridTableHall } from "../../components/containers/GridTableHall";
import Badge from "../../components/ui/Badge";
import { TableHall } from "../../components/ui/TableHall";

export default function Hall() {
    return (
        <div className="mb-8 p-6 bg-background rounded-lg shadow-sm"> {/* Agregamos bg-background */}

            {/* El texto principal (h1) y la descripción (p) ya están bien tipados para temas */}
            <h1 className="text-3xl font-bold mb-2 text-foreground">Gestión de Mesas</h1>
            <p className="text-muted-foreground mb-4">Selecciona una mesa para crear o ver su pedido</p>

            {/* --- Leyenda de Badges --- */}
            <div className="flex gap-4 mb-8">
                {/* Asumimos que 'Badge' ya maneja dark:bg-* y dark:text-* internamente */}

                {/* Badge para mesas LIBRES */}
                <Badge
                    variant="outline"
                    className="px-4 py-2 text-base border-border bg-card text-card-foreground dark:bg-card/70"
                >
                    <span className="w-3 h-3 rounded-full bg-success mr-2 inline-block"></span>
                    Libres
                </Badge>

                {/* Badge para mesas OCUPADAS */}
                <Badge
                    variant="outline"
                    className="px-4 py-2 text-base border-border bg-card text-card-foreground dark:bg-card/70"
                >
                    <span className="w-3 h-3 rounded-full bg-destructive mr-2 inline-block"></span>
                    Ocupadas
                </Badge>

                {/* Badge de TOTAL */}
                <Badge
                    variant="outline"
                    className="px-4 py-2 text-base border-border bg-card text-card-foreground dark:bg-card/70"
                >
                    Total: 8 mesas
                </Badge>
            </div>

            {/* --- Área de Mesas --- */}
            <section>
                {/* GridTableHall y TableHall deben ser responsables de sus propios estilos de modo oscuro */}
                <GridTableHall columns={6}>
                    <TableHall number={1} status="libre" />
                    <TableHall number={2} status="ocupada" />
                    <TableHall number={3} status="ocupada" />
                    <TableHall number={4} status="libre" />
                    <TableHall number={5} status="ocupada" />
                    <TableHall number={6} status="libre" />
                    <TableHall number={7} status="libre" />
                    <TableHall number={8} status="ocupada" />
                </GridTableHall>
            </section>
        </div>
    )
}