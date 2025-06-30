import express from "express";
const app = express();
import cors from "cors";
import authRoute from "./routes/globals/auth/AuthRoute";

app.use(express.json());
app.use(cors())

app.use("/api", authRoute);

export default app;
