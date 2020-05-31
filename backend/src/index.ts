import dotenv from "dotenv";
import Koa, { Context } from "koa";
import Router from "koa-router";
import bodyparser from "koa-bodyparser";
import mongoose from "mongoose";
import cors from "@koa/cors";
import koaStatic from "koa-static";

import api from "./api";
import jwtMiddleware from './lib/jwtMiddleware';

dotenv.config();

const { PORT, MONGO_URI } = process.env;
console.log(MONGO_URI);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("➡️  Connected to MongoDB");
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.get("/", (ctx: Context) => {
  ctx.body = "홈";
});

router.use("/api", api.routes());

app.use(bodyparser());
app.use(cors());
app.use(koaStatic("public"));
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 5000;
app.listen(port, () => {
  console.log("➡️  start koa server at http://localhost:%d", port);
});
