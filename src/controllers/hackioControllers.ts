import { Request, Response } from "express";
import Db from "../repository/db";
import { closeAppDataSource } from "../repository/config";

// Función para obtener todos los productos
export async function getProducts(_req: Request, res: Response) {
    try {
        const db = new Db(); // Crea una nueva instancia de la clase Db
        const getData = await db.getProducts(); // Llama al método getProducts de la instancia db para obtener los productos
        return res.status(200).json(getData); // Devuelve una respuesta HTTP con los productos en formato JSON
    } catch (error) { // Captura cualquier error que ocurra durante la obtención de los productos
        console.error("Error getting products:", error); // Registra un mensaje de error en la consola
        return res.status(500).json({ error: "Internal server error" }); // Devuelve una respuesta HTTP con un estado de error 500 y un mensaje de error genérico
    }
};

// Función para obtener el carrito de compras
export async function getCart(_req: Request, res: Response) {
    try {
        const db = new Db(); // Crea una nueva instancia de la clase Db
        const getData = await db.getCart(); // Llama al método getCart de la instancia db para obtener el carrito
        return res.status(200).json(getData); // Devuelve una respuesta HTTP con el carrito en formato JSON
    } catch (error) { // Captura cualquier error que ocurra durante la obtención del carrito
        console.error("Error getting cart:", error); // Registra un mensaje de error en la consola
        return res.status(500).json({ error: "Internal server error" }); // Devuelve una respuesta HTTP con un estado de error 500 y un mensaje de error genérico
    }
};

// // Función para obtener usuarios

// export async function getUser(_req: Request, res: Response) {
//     try {
//         const db = new Db(); // Crea una nueva instancia de la clase Db
//         console.log("Entro a controller")
//         const getData = await db.getUser(); // Llama al método getUser de la instancia db para obtener los usuarios
//         return res.status(200).json(getData); // Devuelve una respuesta HTTP con los usuarios en formato JSON
//     } catch (error) { // Captura cualquier error que ocurra durante la obtención de los usuarios
//         console.error("Error getting user:", error); // Registra un mensaje de error en la consola
//         return res.status(500).json({ error: "Internal server error" }); // Devuelve una respuesta HTTP con un estado de error 500 y un mensaje de error genérico
//     }
// };


// Función para añadir un artículo al carrito de compras
export async function addToCart(req: Request, res: Response) {
    try {
        // Obtener los parámetros de la solicitud (id de usuario, id de producto y cantidad)
        const userId: number = parseInt(req.body.userId);
        const productId: number = parseInt(req.body.productId);
        const quantity: number = parseInt(req.body.quantity);

        // Crear una instancia de la clase Db
        const db = new Db();

        // Llamar al método addToCart de la instancia db para agregar el artículo al carrito
        const addedToCart = await db.addToCart(userId, productId, quantity);
        // closeAppDataSource();
        // Verificar si el artículo se agregó correctamente al carrito
        if (addedToCart) {
            return res.status(200).json({ message: "Item added to cart successfully" });
        } else {
            return res.status(500).json({ error: "Failed to add item to cart" });
        }
    } catch (error) {
        // Manejar cualquier error y enviar una respuesta de error al cliente
        console.error("Error adding item to cart:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Función para registrar un nuevo usuario utilizando el método POST
export async function registerUser(req: Request, res: Response) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Extraer los datos del formulario de la solicitud
    const { username, email, password } = req.body;
    
    try {
        const db = new Db(); // Crear una instancia de la clase Db
        const result = await db.registerUser(username, email, password); // Llamar al método registerUser de la instancia db para registrar al usuario
        closeAppDataSource();
        return res.status(201).json(result); // Devolver el resultado de la operación de registro en formato JSON
    } catch (error) {
        // Manejar cualquier error y enviar una respuesta de error al cliente
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Función para iniciar sesión de usuario utilizando el método PUT
export async function loginUser(req: Request, res: Response) {
    // Extraer los datos de inicio de sesión del formulario de la solicitud
    const { username, password } = req.body;

    try {
        const db = new Db(); // Crear una instancia de la clase Db
        const result = await db.loginUser(username, password); // Llamar al método loginUser de la instancia db para iniciar sesión del usuario
        closeAppDataSource();
        return res.status(200).json(result); // Devolver el resultado de la operación de inicio de sesión en formato JSON
    } catch (error) {
        // Manejar cualquier error y enviar una respuesta de error al cliente
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

