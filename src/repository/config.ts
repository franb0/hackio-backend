import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './models/product';
import { User } from './models/user';
import { Cart } from './models/cart';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'password',
    database: 'hackioDB',
    synchronize: false,
    logging: true,
    entities: [Product, User, Cart],
    subscribers: []
});

export async function initializeAppDataSource() {
    return await AppDataSource.initialize();
}

export async function closeAppDataSource() {
    return await AppDataSource.close();
}
