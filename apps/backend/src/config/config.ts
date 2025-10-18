import 'dotenv/config';

const VariableEnv = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_TYPE: process.env.DB_TYPE,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    NODE_ENV: process.env.NODE_ENV,
} as const;


export interface ConfigDB {
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_TYPE: string;
}

export interface ConfigServer {
    PORT: number;
}

export const configDb: ConfigDB = {
    DB_HOST: VariableEnv.DB_HOST ?? 'localhost',
    DB_PORT: Number(VariableEnv.DB_PORT) || 5432,
    DB_USER: VariableEnv.DB_USER ?? 'user',
    DB_PASSWORD: VariableEnv.DB_PASSWORD ?? 'password',
    DB_NAME: VariableEnv.DB_NAME ?? 'mydatabase',
    DB_TYPE: VariableEnv.DB_TYPE ?? 'postgres',
};

export const configServer: ConfigServer = {
    PORT: Number(VariableEnv.PORT) ?? 3000,
};

export const Config = {
    db: configDb,
    server: configServer,
    jwt: {
        secret: VariableEnv.JWT_SECRET ?? 'your_jwt_secret_key',
        expiresIn: Number(VariableEnv.JWT_EXPIRES_IN) || 3600,
    },
    NODE_ENV: VariableEnv.NODE_ENV,
};