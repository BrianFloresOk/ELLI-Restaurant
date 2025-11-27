import 'dotenv/config';

const VariableEnv = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_TYPE: process.env.DB_TYPE,
    PORT: process.env.PORT,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    NODE_ENV: process.env.NODE_ENV,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    CORS_PRODUCTION: process.env.CORS_PRODUCTION
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
    CORS_ORIGIN: string,
    CORS_PRODUCTION: string
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
    CORS_ORIGIN: VariableEnv.CORS_ORIGIN || "",
    CORS_PRODUCTION: VariableEnv.CORS_PRODUCTION || ""
};

export const Config = {
    db: configDb,
    server: configServer,
    jwt: {
        access: {
            secret: VariableEnv.JWT_ACCESS_SECRET ?? 'default_access_secret',
            expiresIn: Number(VariableEnv.JWT_ACCESS_EXPIRES_IN) || 3600,
        },
        refresh: {
            secret: VariableEnv.JWT_REFRESH_SECRET ?? 'default_refresh_secret',
            expiresIn: Number(VariableEnv.JWT_REFRESH_EXPIRES_IN) || 86400,
        },
    },
    NODE_ENV: VariableEnv.NODE_ENV,
};