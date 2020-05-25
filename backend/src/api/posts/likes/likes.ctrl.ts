import Post from "../../../models/post";
import { Context } from "koa";

export const like = async (ctx: any) => {
  const { id } = ctx.params;
  let post: any = await Post.findOne({ id }).exec();
  try {
    if (!post) {
      ctx.status = 404;
      return;
    }
    post = await Post.findOneAndUpdate(
      {
        id,
      },
      {
        likes: post.likes + 1,
      },
      {
        new: true,
      }
    );
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const notLike = async (ctx: any) => {
  const { id } = ctx.params;
  let post: any = await Post.findOne({ id }).exec();
  try {
    if (!post) {
      ctx.status = 404;
      return;
    }
    post = await Post.findOneAndUpdate(
      {
        id,
      },
      {
        likes: post.likes - 1,
      },
      {
        new: true,
      }
    );
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
