import { initializeAppDataSource } from "./config";
import { Cart } from "./models/cart";
import { Product } from "./models/product";
import { User } from "./models/user";

export default class Db {
    constructor() {}
    
    // Función para obtener todos los productos
    async getProducts() {
        try {
            // Inicializa la fuente de datos y obtiene el repositorio de productos
            const readData = await (await initializeAppDataSource()).getRepository(Product).find();
            return readData; // Retorna los productos obtenidos
        }
        catch (error) {
            console.error("Error getting products:", error); // Maneja cualquier error y registra un mensaje de error
            return false; // Retorna false en caso de error
        }
    }

    // Función para obtener el carrito de compras
    async getCart() {
        try {
            // Inicializa la fuente de datos y obtiene el repositorio del carrito
            const readData = await (await initializeAppDataSource()).getRepository(Cart).find();
            return readData; // Retorna el carrito obtenido
        }
        catch (error) {
            console.error("Error getting cart:", error); // Maneja cualquier error y registra un mensaje de error
            return false; // Retorna false en caso de error
        }
    }

    // Función para vaciar el carrito de compras
    async clearCart() {
        try {
            // Inicializa la fuente de datos
            const dataSource = await initializeAppDataSource();
            // Obtiene el repositorio del carrito
            const cartRepo = dataSource.getRepository(Cart);
            // Borra todos los registros de la tabla del carrito
            await cartRepo.clear();
            return true; // Retorna true si el vaciado del carrito fue exitoso
        } catch (error) {
            console.error("Error clearing cart:", error); // Maneja cualquier error y registra un mensaje de error
            return false; // Retorna false en caso de error
        }
    }

    async deleteUser(locationUser: string, id: string) {
        try {
            //Buscar funcion de orm que encuentre y/o borre el usuario. 
            //(ejemplo)
            return
        }
        catch (err) {
            return
        }
    };

    // Función para añadir un artículo al carrito
    async addToCart(userId: number, productId: number, quantity: number) {
        try {
            // Inicializa la fuente de datos
            const dataSource = await initializeAppDataSource();
            // Obtiene los repositorios para las entidades Cart, User y Product
            const cartRepo = dataSource.getRepository(Cart);
            const userRepo = dataSource.getRepository(User);
            const productRepo = dataSource.getRepository(Product);
            // Busca el usuario y el producto correspondientes en la base de datos
            const user = await userRepo.findOne({ where: { id: userId } });
            const product = await productRepo.findOne({ where: { id: productId } });
            // Verifica si el usuario y el producto existen
            if (!user || !product) {
                throw new Error("User or product not found.");
            }
            // Busca si ya existe un elemento de carrito para este usuario y producto
            let cartItem = await cartRepo.findOne({ where: { user, product } });
            // Si no existe, crea un nuevo elemento de carrito
            if (!cartItem) {
                cartItem = new Cart();
                cartItem.user = user;
                cartItem.product = product;
            }
            // Aumenta la cantidad del producto en el carrito
            cartItem.quantity += quantity;
            // Guarda el elemento del carrito en la base de datos
            await cartRepo.save(cartItem);
            return cartItem; // Devuelve el elemento del carrito
        } catch (error) {
            console.error("Error adding to cart:", error); // Maneja cualquier error y registra un mensaje de error
            return null; // Devuelve null en caso de error
        }
    }

    // Función para obtener usuarios
    async getUser() {
        try {
            // Inicializa la fuente de datos y obtiene el repositorio de usuarios 
            console.log("Entro a db")
            const readData = await (await initializeAppDataSource()).getRepository(User).find();
            return readData; // Retorna los usuarios obtenidos
        }
        catch (error) {
            console.error("Error getting user:", error); // Maneja cualquier error y registra un mensaje de error
            return false; // Retorna false en caso de error
        }
    }

    async registerUser(username: string, email: string, password: string) {
        try {
            const dataSource = await initializeAppDataSource(); // Inicializa la fuente de datos de la aplicación
            const userRepo = dataSource.getRepository(User); // Obtiene el repositorio para la entidad User
    
            // Verifica si ya existe un usuario con el mismo nombre de usuario
            const existingUser = await userRepo.findOne({ where: { username } });
            if (existingUser) {
                return { success: false, error: "Username already exists" };
            }
    
            // Crea un nuevo usuario
            const newUser = new User(username, email, password);
            newUser.username = username;
            newUser.email = email;
            newUser.password = password;
    
            // Guarda el usuario en la base de datos
            await userRepo.save(newUser);
    
            return { success: true, message: "User registered successfully" };
        } catch (error) {
            console.error("Error registering user:", error);
            return { success: false, error: "Internal server error" };
        }
    }
    
    async loginUser(username: string, password: string) {
        try {
            const dataSource = await initializeAppDataSource(); // Inicializa la fuente de datos de la aplicación
            const userRepo = dataSource.getRepository(User); // Obtiene el repositorio para la entidad User
    
            // Busca el usuario en la base de datos por nombre de usuario y contraseña
            const user = await userRepo.findOne({ where: { username, password } });
            if (user) {
                return { success: true, message: "Login successful" };
            } else {
                return { success: false, error: "Incorrect username or password" };
            }
        } catch (error) {
            console.error("Error logging in:", error);
            return { success: false, error: "Internal server error" };
        }
    }
    
}