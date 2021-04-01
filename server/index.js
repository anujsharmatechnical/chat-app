import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";

//mongo connectuion
import "../config/mongo.js";
//routes

// import indexRouter from ".routes/index.js";
import indexRouter from "../routes/index.js";
import userRouter from "../routes/userRouter.js";
import chatRoomRouter from "../routes/chatRoom.js";
import deleteRouter from "../routes/delete.js";

//middlewares

// import { decode } from "./middlewares/jwt.js";

const app = express();

//get port from environment and store in express
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("./users", userRouter);
app.use("/room", chatRoomRouter);
app.use("/delete", deleteRouter);

//catch errror 404
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "api does not exist",
  });
});

//create http server easy

const server = http.createServer(app);
server.listen(port);
//event listener
server.on("listening", () => {
  console.log(`listening on port ::http//localhost:${port}`);
});
