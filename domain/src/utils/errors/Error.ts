export class ErrorDomain extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ErrorDomain.prototype);
        this.name = "ErrorDomain";
    }
}