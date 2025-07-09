import express from "express";
const app = express();
import cors from "cors";
import authRoute from "./routes/globals/auth/AuthRoute";
import instituteRoute from "./routes/institute/instituteRoute"
import courseRoute from "./routes/institute/courseRoute/courseRoute"
import studentRoute from "./routes/institute/stdentRoute/studentRoute"
import categoryRoute from "./routes/institute/category/categoryRoute"
import teacherInstituteRoute from "./routes/institute/teacherRoute/teacherRoute"
import teacherRoute from "./routes/teacher/teacherRoute"

app.use(express.json());

//alternative bdy parser

app.use(cors())

//global route for all users

app.use("/api", authRoute);

// institute route 

app.use("/api/institute", instituteRoute)
app.use('/api/institute/course', courseRoute)
app.use('/api/institute/student', studentRoute)
app.use('/api/institute/category', categoryRoute)
app.use('/api/institute/teacher', teacherInstituteRoute)

// teacher route

app.use('/api/teacher', teacherRoute)

export default app;
