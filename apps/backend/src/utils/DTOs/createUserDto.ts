import { UserRole} from "domain-elli"

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}