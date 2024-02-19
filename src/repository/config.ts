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

// Inicialización de la aplicación y carga inicial de datos
AppDataSource.initialize()
    .then(async () => {
        console.log("Server initialized");

        // Obtener repositorios para Productos
        const productRepository = AppDataSource.manager.getRepository(Product);

        // Verificar si ya existen productos en la base de datos
        const existingProducts = await productRepository.find();

        // Añadir productos si no hay ninguno
        if (existingProducts.length === 0) {
            const productsToAdd = [
                { name: "USB Rubber Ducky", price: 40, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F8f64b8c6-9af9-4707-b3ae-00f6d19c4def.bf98ec597a3f5da714c779a4856b3a10.jpeg&f=1&nofb=1&ipt=b10a330a31c8c97773326b1a834866c7274c91d8b4b24f262e1078562370ee5b&ipo=images" },
                { name: "Wi-Fi Pineapple", price: 120, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F2175%2F8571%2Fproducts%2FWifi-Pineapple-M7-Tactical_1024x1024%402x.png%3Fv%3D1617383382&f=1&nofb=1&ipt=d6d05cc33c30a411d5839124e7db9dfc2b56b917053e570dc1e1c654f7d71e81&ipo=images" },
                { name: "LAN Turtle", price: 80, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0068%2F2142%2Fcollections%2Flanturtle1_2048x.png%3Fv%3D1438023356&f=1&nofb=1&ipt=35fe1de10346ceab317a604746ba1968e74bad5527a3e2bc998592df9c10d72c&ipo=images" },
                // Otros productos...
            ];

            // Guardar los productos en la base de datos
            await productRepository.save(productsToAdd.map(productData => productRepository.create(productData)));
            console.log("Initial products saved to the database");
        }

        closeAppDataSource();
    })
    .catch((err) => console.log(err));
