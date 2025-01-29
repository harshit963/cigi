import express from "express"
import cors from 'cors'
import bodyParser from "body-parser"
import 'dotenv/config'
import connectDB from "./src/config/mongodb.js";
import AuthRouter from "./src/routes/AuthRoutes.js"
import locationRoutes from './src/routes/locationRoutes.js';

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()

// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

// Initializing Routers
app.use("/auth", AuthRouter);
app.use('/api/locations', locationRoutes);

app.get("/", (req, res) => res.send("API Working"))

app.listen(port, () => console.log(`Server started on ${port}`))