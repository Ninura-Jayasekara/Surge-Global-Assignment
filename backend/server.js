require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const connection = require("./db");
const { errorHandler } = require('./middleware/errorMiddleware');

//import routers
const userRouter = require('./Routes/userRoutes');
const noteRouter = require('./Routes/noteRoutes');


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(errorHandler);


// routes
app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Server is listening on port ${port}...`));