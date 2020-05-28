import Post from "../../../../models/post";
import { Context } from "koa";
import Joi from "joi";

/*
  POST /api/posts/:id/comments/:comment_id/recomment
  {
      text: '화이팅!',    
  }
*/
export const write = async (ctx: any) => {
  const schema = Joi.object().keys({
    text: Joi.string().required(),
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { id, comment_id } = ctx.params;
  const { text } = ctx.request.body;
  const post: any = new Post();
  try {
    const postDoc: any = await Post.findOne({ id }).exec();
    const comments = postDoc.comments;

    let comment_index: number = -1;
    comments.some((c: any, i: number) => {
      if (c.id.toString() === comment_id) {
        comment_index = i;
        return true;
      }
    });
    if (!postDoc || comment_index === -1) {
      ctx.status = 404;
      return;
    }
    const recomments = comments[comment_index].recomments;
    const recomment_id = recomments[recomments.length - 1]
      ? recomments[recomments.length - 1].id + 1
      : 1;
    const recommentDoc = post.comments[0].recomments.create({
      text,
      id: recomment_id,
    });
    comments[comment_index].recomments.push(recommentDoc);
    await Post.findOneAndUpdate(
      { id },
      {
        comments,
      },
      {
        new: true,
      }
    );
    ctx.body = recommentDoc;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/posts/:id/comments/:comment_id/recomments
*/
export const list = async (ctx: Context) => {
  const { id, comment_id } = ctx.params;
  const { text } = ctx.request.body;
  const post: any = new Post();
  try {
    const postDoc: any = await Post.findOne({ id }).exec();
    const comments = postDoc.comments;

    let comment_index: number = -1;
    comments.some((c: any, i: number) => {
      if (c.id.toString() === comment_id) {
        comment_index = i;
        return true;
      }
    });
    if (!postDoc || comment_index === -1) {
      ctx.status = 404;
      return;
    }
    const recomments = comments[comment_index].recomments;
    ctx.body = recomments;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/posts/:id/comments/:comment_id
*/
// export const read = async (ctx: Context) => {};

/*
  DELETE /api/posts/:id
*/
export const remove = async (ctx: Context) => {
  const { id, comment_id, recomment_id } = ctx.params;
  const post: any = new Post();
  try {
    const postDoc: any = await Post.findOne({ id }).exec();
    const comments = postDoc.comments;

    let comment_index: number = -1;
    comments.some((c: any, i: number) => {
      if (c.id.toString() === comment_id) {
        comment_index = i;
        return true;
      }
    });
    if (!postDoc || comment_index === -1) {
      ctx.status = 404;
      return;
    }
    const recomments = comments[comment_index].recomments;
    const newRecomments = recomments.filter(
      (r: any) => r.id.toString() !== recomment_id
    );
    if (recomments.join() === newRecomments.join()) {
      ctx.status = 404;
      return;
    }
    comments[comment_index].recomments = newRecomments;
    await Post.findOneAndUpdate(
      {
        id,
      },
      {
        comments,
      }
    );
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  PATCH /api/posts/:id/comments/:commend_id
*/
export const update = async (ctx: any) => {
  const schema = Joi.object().keys({
    text: Joi.string().required(),
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { id, comment_id, recomment_id } = ctx.params;
  const { text } = ctx.request.body;
  const post: any = new Post();
  try {
    const postDoc: any = await Post.findOne({ id }).exec();
    const comments = postDoc.comments;

    let comment_index: number = -1;
    comments.some((c: any, i: number) => {
      if (c.id.toString() === comment_id) {
        comment_index = i;
        return true;
      }
    });
    if (!postDoc || comment_index === -1) {
      ctx.status = 404;
      return;
    }
    const recomments = comments[comment_index].recomments;
    let recomment_index: number = -1;
    recomments.some((r: any, i: number) => {
      if (r.id.toString() === recomment_id) {
        recomment_index = i;
        return true;
      }
    });

    if (recomment_index === -1) {
      ctx.status = 404;
      return;
    }
    recomments[recomment_index].text = text;
    recomments[recomment_index].isEdited = true;

    await Post.findOneAndUpdate(
      { id },
      {
        comments,
      },
      {
        new: true,
      }
    );
    ctx.body = recomments[recomment_index];
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkId = (ctx: Context, next: () => void) => {
  const { recomment_id } = ctx.params;
  if (recomment_id && !(parseInt(recomment_id) >= 1)) {
    ctx.status = 400;
    return;
  }
  return next();
};