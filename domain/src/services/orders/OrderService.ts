import { Order } from "../../entities/Order"

export interface OrderService {
    findById(id: string): Promise<Order | null>
    save(order: Order): Promise<void>
    update(id: string, data: Order): Promise<void>
    delete(id: string): Promise<void>
    list(): Promise<Order[]>
    findByStatus(status: string): Promise<Order[]>
}