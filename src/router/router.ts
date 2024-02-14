import { Router } from "express";
import { addToCart, getCart, getProducts, loginUser, registerUser } from "../controllers/hackioControllers";

const hackioRouter = Router();

// Rutas existentes
hackioRouter.get('/products', getProducts);
//hackioRouter.get('/products/:id', getProductsId);
hackioRouter.get('/cart', getCart);
//hackioRouter.get('/user', getUser);
hackioRouter.post('/addToCart', addToCart);
//hackioRouter.delete('/clearCart', clearCart);
//hackioRouter.delete('/deleteUser/:argUsers/:id', deleteUser);

// Nuevas rutas para registro e inicio de sesión de usuarios
hackioRouter.post('/user/register', registerUser);
hackioRouter.get('/user/login', loginUser);

export default hackioRouter;
