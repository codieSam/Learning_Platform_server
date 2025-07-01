import express from "express";
const app = express();
import cors from "cors";
import authRoute from "./routes/globals/auth/AuthRoute";
import instituteRoute from "./routes/institute/instituteRoute"

app.use(express.json());
app.use(cors())

app.use("/api", authRoute);
app.use("/api/institute", instituteRoute)

export default app;
