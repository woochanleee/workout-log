import Router from "koa-router";
import * as recommentCtrl from "./recomment.ctrl";

const recomments = new Router();

recomments.get("/", recommentCtrl.list);
recomments.post("/", recommentCtrl.write);
// recomment.get("/:recomment_id", recommentCtrl.read);

const recomment = new Router();

recomment.delete("/", recommentCtrl.remove);
recomment.patch("/", recommentCtrl.update);

recomments.use("/:recomment_id", recommentCtrl.checkId, recomment.routes());
export default recomments;
