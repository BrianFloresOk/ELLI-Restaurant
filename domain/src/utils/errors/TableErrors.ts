import { ErrorDomain } from "./Error";

export class TableNotAvailable extends ErrorDomain {
    constructor(tableId: string) {
        super(`Table with ID ${tableId} is not available.`);
        this.name = "TableNotAvailable";
    }
}

export class TableNotFound extends ErrorDomain {
    constructor(tableId: string) {
        super(`Table with ID ${tableId} not found.`);
        this.name = "TableNotFound";
    }
}

export class TableOccupied extends ErrorDomain {
    constructor(tableId: string) {
        super(`Table with ID ${tableId} is currently occupied.`);
        this.name = "TableOccupied";
    }
}