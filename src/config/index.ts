import merge from "lodash.merge";
import local from "./local";
import prod from "./prod";
import testing from "./testing";
const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {
  envConfig = prod;
} else if (stage === "testing") {
  envConfig = testing;
} else {
  envConfig = local;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
    baseUrl: process.env.BASE_URL,
  },
  envConfig
);
