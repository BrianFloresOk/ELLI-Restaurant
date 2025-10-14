import { User } from "../../entities/User"
import { UserRole } from "../../utils/types/UserRol"

export interface UserService {
    findById(id: string): Promise<User | null>
    save(user: User): Promise<void>
    update(user: User): Promise<void>
    deactivate(id: string): Promise<void>
    findByRole(role: UserRole): Promise<User[]>
    findByEmail(email: string): Promise<User | null>
}
