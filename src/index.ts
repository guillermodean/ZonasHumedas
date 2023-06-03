import express, { Application } from "express";
import { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import fichaRoutes from "./routes/ficha";
import usersRoutes from "./routes/users";
import loginRoutes from "./routes/login";
import dotenv from "dotenv";
import logger from './logger';

dotenv.config();

class Server {
  public app: Application;

  constructor() {

    // Load .env file contents into process.env.
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    // settings
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

    // error handler
    this.app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => { 
      logger.error('An error occurred:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  }

  routes(): void {
    // routes for the app all starting with api
    this.app.use("/api/users", usersRoutes.router);
    this.app.use("/api/ficha", fichaRoutes.router);
    this.app.use("/api/login", loginRoutes.router);
    this.app.use("/api", (req: Request, res: Response) => {
      res.json({ text: "welcom to API humedales" });
    });
  }


  start(): void {
    // Start the server on the specified port
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
      logger.info("Server on port", this.app.get("port"));
    });
  }
}
const server = new Server();
server.start();
