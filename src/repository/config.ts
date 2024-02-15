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
                { name: "USB Rubber Ducky", price: 40, image: "https://images.hak5.org/wp-content/uploads/2020/01/19162412/usb-rubber-ducky.png" },
                { name: "Wi-Fi Pineapple", price: 120, image: "https://images.hak5.org/wp-content/uploads/2018/07/03091454/wp-1530696340854.jpg" },
                { name: "LAN Turtle", price: 80, image: "https://images.hak5.org/wp-content/uploads/2018/07/03091453/wp-1530696341814.jpg" },
                // Otros productos...
            ];

            // Guardar los productos en la base de datos
            await productRepository.save(productsToAdd.map(productData => productRepository.create(productData)));
            console.log("Initial products saved to the database");
        }

        closeAppDataSource();
    })
    .catch((err) => console.log(err));
