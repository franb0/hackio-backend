import { Router } from "express";
import { addToCart, clearCart, getCart, getProducts, getUser, loginUser, registerUser, deleteUser } from "../controllers/hackioControllers";

const hackioRouter = Router();

// Rutas existentes
hackioRouter.get('/products', getProducts);
hackioRouter.get('/cart', getCart);
hackioRouter.get('/user', getUser);
hackioRouter.post('/addToCart', addToCart);
hackioRouter.delete('/clearCart', clearCart);
hackioRouter.delete('/deleteUser/:argUsers/:id', deleteUser);

// Nuevas rutas para registro e inicio de sesión de usuarios
hackioRouter.put('/user/register', registerUser);
hackioRouter.put('/user/login', loginUser);

export default hackioRouter;
