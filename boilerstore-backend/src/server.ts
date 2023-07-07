// # IMPORTS
// ## IMPORTING LIBS
import express from "express";
import mongoose from "mongoose";

// ## IMPORTING ROUTES
import genericRoutes from "./routes/generic";

// # MAIN
// ## CREATING APP
const app = express();

// ## APPLYING EXTENSIONS
app.use(express.json());

// ## APPLYING ROUTES
app.use("/test", genericRoutes);

// # EXPORTING DEFAULT
export default app;
