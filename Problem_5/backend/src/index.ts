import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoute from "./module/auth/auth.routes";
import { typeOrmConfig } from "./config/postgres";
dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Ddos = require("dddos");

typeOrmConfig.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization:", err)
  })
// config express
const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
// add route
app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: "hello" });
});
// stop ddos
app.use(
  /* Example situation
   *
   * Say weight is 1, maxWeight is 10 and checkInterval is 1000.
   * A user makes 35 requests in one second. First 10 request pass the module, the other 25 do not. The weight is 35 for now. Then the user stops sending requests.
   * After 1 second passes by, the weight is decremented by 10 and becomes 25. The user attempts to make one more request, which does not pass. The weight becomes 26.
   * Two sceonds later (after two checks) the weight is decreased twice and becomes 6. The user attempts to make a request, which now successfully passes the check. The weight becomes 7.
   */
  new Ddos({
    checkInterval: 1000, // 1 second
    weight: 1,
    maxWeight: 10, // max request per checkInterval
    logFunction: (...args: any) => {
      console.log("Detected DDoS: ", args);
    },
  }).express("ip", "path")
);

// specific route
app.use(authRoute);
// app.use(contentRoute);
// app.use(profileRoute);
// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    is_show_message: err.isShowMessage,
  });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
