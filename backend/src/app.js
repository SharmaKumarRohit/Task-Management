const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use(errorHandler);

module.exports = app;

// CORS => Cross-Origin Resource Sharing -> A frontend (React, etc.) can access a backend API running on a different origin (domain/port)

// What "app.use(cors())" does -> Allow requests from other origins means allow frontend apps to call API.

// Why app.use() is used
// 1.) app.use() registers middlewar
// 2.) Middleware runs before routes
// so CORS is applied to all API requests

// app.use(cors({origin: "https://www.google.com"})) => Allow only frontend, not everyone

// app.use(cors()) => allows frontend to safely communicate with backend API.
