import { Entity } from "../utils/types/Entity"

export interface Table extends Entity {
    capacity: number;
    status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';
    assignedWaiterId?: number
}