import { User } from "../../entities/User"
import { UserRol } from "../../utils/types/UserRol"

export interface UserService {
    findById(id: number): Promise<User | null>
    save(user: Omit<User, "id">): Promise<void>
    update(id: number, user: User): Promise<void>
    deactivate(id: number): Promise<void>
    activate(id: number): Promise<void>
    find(): Promise<User[]>
    findByEmail(email: string): Promise<User | null>
}