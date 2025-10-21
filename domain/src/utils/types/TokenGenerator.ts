type Payload = {
    id: number;
    email: string;
    role: string;
}

export interface TokenGenerator {
    generate(payload: Payload): Promise<string>;
    verify(token: string): Promise<Payload | null>;
};
