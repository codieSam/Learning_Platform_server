import express from "express";
const app = express();
import cors from "cors";
import authRoute from "./routes/globals/auth/AuthRoute";
import instituteRoute from "./routes/institute/instituteRoute"
import courseRoute from "./routes/institute/courseRoute/courseRoute"
import studentRoute from "./routes/institute/stdentRoute/studentRoute"
import categoryRoute from "./routes/institute/category/categoryRoute"
import teacherRoute from "./routes/institute/teacherRoute/teacherRoute"

app.use(express.json());
app.use(cors())

app.use("/api", authRoute);
app.use("/api/institute", instituteRoute)
app.use('/api/institute/course', courseRoute)
app.use('/api/institute/student', studentRoute)
app.use('/api/institute/category', categoryRoute)
app.use('/api/institute/teacher', teacherRoute)

export default app;
