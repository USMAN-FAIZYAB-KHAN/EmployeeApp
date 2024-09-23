import express from "express"
import cors from "cors"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))


//Routes
import employeeRouter  from "./routes/employee.routes.js";
import departmentRouter from "./routes/department.routes.js"
import designationRouter from "./routes/designation.routes.js"

app.use('/api', employeeRouter);
app.use('/api', departmentRouter);
app.use('/api', designationRouter);

export { app }