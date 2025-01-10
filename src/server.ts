import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app: Express = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

process.on("exit", (code) => {
  console.log(`Exiting with code:${code}`);
});

const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
  server.on("error", (error) => {
    console.log("Failed to start server!", error);
    process.exit(1);
  });
};

startServer();
