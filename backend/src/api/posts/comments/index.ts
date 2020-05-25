import Router from "koa-router";
import * as commentCtrl from "./comment.ctrl";
import recomments from "./recomments";

const comments = new Router();

comments.get("/", commentCtrl.list);
comments.post("/", commentCtrl.write);

const comment = new Router();
comment.get("/", commentCtrl.read);
comment.delete("/", commentCtrl.remove);
comment.patch("/", commentCtrl.update);

comments.use("/:comment_id", commentCtrl.checkId, comment.routes());
comments.use("/:comment_id/recomments", recomments.routes());

export default comments;
