import { User } from 'domain/src/entities';
import { UserService } from '../../services/users/UserService';


interface Dependencies {
    userService: UserService;
}

interface DeactivateInput {
    dependencies: Dependencies;
}

export async function viewUserListUseCase({ dependencies }: DeactivateInput): Promise<User[]> {
    const { userService } = dependencies;
    const users = await userService.find();
    return users;
}
