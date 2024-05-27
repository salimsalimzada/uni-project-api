import express from "express";
import router from "./router";

import morgan from "morgan";
import { protect } from "./helpers/auth";
import { createNewUser, signIn } from "./handlers/user";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.json({ message: "hello" });
});
app.use(cors());
app.use("/api", router);

app.post("/signup", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "oops, that's a server???" });
  }
});
export default app;
