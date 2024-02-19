import express from "express";
import cors from "cors";
import hackioRouter from "./router/router";
import "./repository/config";

const app = express();
const PORT = 8080;

// Middleware
app.use(cors()); // Allow requests from all origins

// Enable pre-flight requests for all routes
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/", hackioRouter);

// Listening
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});
