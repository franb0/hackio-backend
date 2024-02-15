import express from "express";
import cors from "cors";
import hackioRouter from "./router/router";
import "./repository/config"

const app = express();
const PORT = 8080;

// middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());


// routes
app.use("/",hackioRouter)

// listening
app.listen(PORT, () => { console.log("listening on port 8080") })