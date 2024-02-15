import { Router } from "express";
import { addToCart, getCart, getProducts, loginUser, registerUser } from "../controllers/hackioControllers";

const hackioRouter = Router();

// Rutas existentes
hackioRouter.get('/products', getProducts);
hackioRouter.get('/cart', getCart);
hackioRouter.post('/addToCart', addToCart);
hackioRouter.post('/register', registerUser);
hackioRouter.get('/login', loginUser);

// Rutas en desuso
//hackioRouter.get('/products/:id', getProductsId);
//hackioRouter.get('/user', getUser);
//hackioRouter.delete('/clearCart', clearCart);
//hackioRouter.delete('/deleteUser/:argUsers/:id', deleteUser);


export default hackioRouter;
