import { User } from "../../entities/User"
import { UserRol } from "../../utils/types/UserRol"

export interface UserService {
    findById(id: string): Promise<User | null>
    save(user: Omit<User, "id">): Promise<void>
    update(user: User): Promise<void>
    deactivate(id: string): Promise<void>
    findByRole(role: UserRol): Promise<User[]>
    findByEmail(email: string): Promise<User | null>
}
