import Router from "koa-router";
import * as recommentCtrl from "./recomment.ctrl";

const recomments = new Router();

recomments.get("/", recommentCtrl.list);
recomments.post("/", recommentCtrl.write);

const recomment = new Router();

recomment.delete("/", recommentCtrl.checkOwnRecomment, recommentCtrl.remove);
recomment.patch("/", recommentCtrl.checkOwnRecomment, recommentCtrl.update);

recomments.use("/:recomment_id", recommentCtrl.getRecommentById, recomment.routes());
export default recomments;
