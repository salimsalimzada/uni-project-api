import * as dotenv from "dotenv";
import config from "./config";
import app from "./server";
dotenv.config();
app.listen(config.port, () => {
  console.log(
    `service is running on ${process.env.baseUrl}:${process.env.port}`
  );
});
