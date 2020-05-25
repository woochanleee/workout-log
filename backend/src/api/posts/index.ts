import Router from "koa-router";
import koaBody from "koa-body";

import * as postCtrl from "./posts.ctrl";
import likes from "./likes";
import comments from "./comments";

const posts = new Router();

posts.get("/", postCtrl.list);
posts.post(
  "/",
  koaBody({
    multipart: true,
  }),
  postCtrl.write
);

const post = new Router();
post.get("/", postCtrl.read);
post.delete("/", postCtrl.remove);
post.patch(
  "/",
  koaBody({
    multipart: true,
  }),
  postCtrl.update
);

posts.use("/:id", postCtrl.checkId, post.routes());
posts.use("/:id/like", likes.routes());
posts.use("/:id/comments", comments.routes());

export default posts;
