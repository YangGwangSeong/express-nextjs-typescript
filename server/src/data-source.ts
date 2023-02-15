import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5433,
	username: 'postgresID',
	password: 'postgresPW',
	database: 'postgres',
	synchronize: true,
	logging: false,
	entities: ['src/entities/**/*.ts'],
	migrations: [],
	subscribers: [],
});
