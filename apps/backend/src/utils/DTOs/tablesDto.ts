export interface TablesDTO {
    tables: Array<{
        capacity: number;
        status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';
        assignedWaiterId?: number;
    }>
}