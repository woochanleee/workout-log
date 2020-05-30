import Router from "koa-router";
import * as commentCtrl from "./comment.ctrl";
import recomments from "./recomments";

const comments = new Router();

comments.get("/", commentCtrl.list);
comments.post("/", commentCtrl.write);

const comment = new Router();
comment.get("/", commentCtrl.read);
comment.delete("/", commentCtrl.checkOwnComment, commentCtrl.remove);
comment.patch("/", commentCtrl.checkOwnComment, commentCtrl.update);

comments.use("/:comment_id", commentCtrl.getCommentById, comment.routes());
comments.use("/:comment_id/recomments", recomments.routes());
export default comments;
