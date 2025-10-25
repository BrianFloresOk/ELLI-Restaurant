import { AppError } from "./AppError";

export class UnexpectedError extends AppError {
    constructor(message: string) {
        super(message, 500);
    }
}
