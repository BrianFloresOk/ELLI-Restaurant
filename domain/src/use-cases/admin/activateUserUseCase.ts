import { UserService } from '../../services/users/UserService';


interface Dependencies {
    userService: UserService;
}

interface Payload {
    userId: number
}

interface DeactivateInput {
    payload: Payload;
    dependencies: Dependencies;
}

export async function activateUserUseCase({ payload, dependencies }: DeactivateInput): Promise<void> {
    const { userService } = dependencies;
    const { userId } = payload;

    const userExists = await userService.findById(userId);
    if (!userExists) {
        throw new Error('User not found');
    }

    if (userExists.isActive === true) {
        throw new Error('User is already activated');
    }

    await userService.activate(userId);
}