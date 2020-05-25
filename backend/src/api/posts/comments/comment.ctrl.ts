import Post from "../../../models/post";
import { Context } from "koa";
import Joi from "joi";

/*
  POST /api/posts/:id/comments/
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
  const { id } = ctx.params;
  const { text } = ctx.request.body;
  const post: any = new Post();
  try {
    const postDoc: any = await Post.findOne({ id }).exec();
    const comments = postDoc.comments;
    const comment_id = comments[comments.length - 1]
      ? comments[comments.length - 1].id + 1
      : 1;
    if (!postDoc) {
      ctx.status = 404;
      return;
    }

    const commentDoc = post.comments.create({ text, id: comment_id });
    const newComments = [...postDoc.comments].concat(commentDoc);
    await Post.findOneAndUpdate(
      { id },
      {
        comments: newComments,
      },
      {
        new: true,
      }
    );
    ctx.body = commentDoc;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/posts/:id/comments/
*/
export const list = async (ctx: Context) => {
  const { id } = ctx.params;
  try {
    const post: any = await Post.findOne({ id }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post.comments;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/posts/:id/comments/:comment_id
*/
export const read = async (ctx: Context) => {
  const { id, comment_id } = ctx.params;
  try {
    const post: any = await Post.findOne({ id }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    const comments = post.comments;
    if (comments.length) {
      const comment = comments.filter(
        (c: any) => c.id.toString() === comment_id
      );
      if (comment.length) ctx.body = comment;
      else ctx.status = 404;
    } else {
      ctx.status = 404;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  DELETE /api/posts/:id
*/
export const remove = async (ctx: Context) => {
  const { id, comment_id } = ctx.params;
  try {
    const post: any = await Post.findOne({ id }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    const comments = post.comments;
    if (comments.length) {
      const newComments = comments.filter(
        (c: any) => c.id.toString() !== comment_id
      );
      if (newComments.join() !== comments.join()) {
        await Post.findOneAndUpdate(
          {
            id,
          },
          {
            comments: newComments,
          },
          {
            new: true,
          }
        );
        ctx.status = 204;
      } else ctx.status = 404;
    } else {
      ctx.status = 404;
    }
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
  const { id, comment_id } = ctx.params;
  const { text } = ctx.request.body;
  try {
    const postDoc: any = await Post.findOne({ id }).exec();
    const comments = postDoc.comments;

    const newComent = comments.filter((c: any, i: number, arr: any) => {
      if (c.id.toString() === comment_id) {
        arr[i].text = text;
        arr[i].isEdited = true;
        return true;
      }
    });
    if (!postDoc || !newComent.length) {
      ctx.status = 404;
      return;
    }

    await Post.findOneAndUpdate(
      { id },
      {
        comments: comments,
      },
      {
        new: true,
      }
    );
    ctx.body = newComent;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkId = (ctx: Context, next: () => void) => {
  const { comment_id } = ctx.params;
  if (comment_id && !(parseInt(comment_id) >= 1)) {
    ctx.status = 400;
    return;
  }
  return next();
};
