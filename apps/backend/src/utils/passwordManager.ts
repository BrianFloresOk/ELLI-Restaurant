import bcrypt from 'bcryptjs';
import { PasswordHasher } from 'domain-elli';

export const passwordManager : PasswordHasher = {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    },
    async compare(plain: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(plain, hashed);
    }
}