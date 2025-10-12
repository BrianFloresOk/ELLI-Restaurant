import { Entity } from "../utils/types/Entity"

export interface Table extends Entity {
    name: string; // Ej: "Mesa 5", "Barra 1"
    capacity: number;
    status: 'AVAILABLE' | 'OCCUPIED' | 'NEEDS_CLEANING';
    assignedWaiterId?: string
}
