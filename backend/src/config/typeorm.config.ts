import { registerAs } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' })

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*-migration.ts'],
    autoLoadEntities: true,
    logging: true
}


export default registerAs('typeorm', () => typeOrmConfig) // to load by global config
export const connectionSource = new DataSource(typeOrmConfig as DataSourceOptions) // for migrations