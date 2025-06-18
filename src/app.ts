import express from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import accountsRouter from "./api/accounts/accounts.routes";
import notFoundHandler from "./middlewares/NotFound";
import errorHandler from "./middlewares/ErrorHandler";
import path from "path";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(new Date().toLocaleString());
  next();
});
app.use(morgan("dev")); // Morgan is a thid party logging middleware, it logs every request to the console
app.use(cors()); // CORS is a middleware that allows cross-origin requests, it is used to allow requests from different origins (domains)

app.use(express.json()); // Middleware to parse JSON bodies, every single request with body has to be JSon
// all middleware must be placed before the routes
app.use("/accounts", accountsRouter); // app.use is app level middleware
app.use("./src/uploads", express.static(path.join(__dirname, "uploads"))); // this middleware will fix the image path so we can view it in a browser, joining the root dir with uploads

// ----------- 404 error handler middleware and plug in controllers
app.use(notFoundHandler);

// ----------- 500 error handler middleware and plug in controllers
app.use(errorHandler);

export default app;

// app.ts is where we place middlewares, routes, and other configurations for the Express application.
