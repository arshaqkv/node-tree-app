import express, { Request, Response, Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "../config/config";
import { connectDB } from "../infrastructure/database/db";
import { errorHandler } from "../interface/middlewares/error.middleware";
import { nodeRoutes } from "../interface/routes/node.routes";

const app: Application = express();
const PORT: number = config.PORT;

//middlewares
app.use(express.json());

if (config.ENVIRONMENT === "development") {
  app.use(morgan("dev"));
}

//cors setup
app.use(
  cors({
    origin: config.CORS.CLIENT_URL,
    allowedHeaders: config.CORS.ALLOWED_HEADERS,
    methods: config.CORS.ALLOWED_METHODS,
    credentials: config.CORS.CREDENTIALS,
  })
);

//test api
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//routes
app.use("/api/node", nodeRoutes);

//error handling middleware
app.use(errorHandler);

//listen port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
