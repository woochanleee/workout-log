import { Context } from 'koa';
import Joi from 'joi';
import loginTypeList from '../../../../utils/loginTypeList';
import User from '../../models/user';

/*
    POST /api/auth/login
    {
        username: 'uchanlee',
        email: 'uchan.dev@gmail.com',
        profileImage: 'https://google.image'
    }
*/
export const login = async (ctx: Context) => {
  const schema = Joi.object().keys({
    username: Joi.string(),
    email: Joi.string(),
    profileImage: Joi.string(),
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, email, profileImage } = ctx.request.body;

  try {
    let user = await User.findByEmail(email);
    if (user) {
      ctx.body = user;
      const token = user.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      return;
    }

    const loginType = email.split('@')[1];
    if (!loginTypeList.includes(loginType)) {
      ctx.status = 405;
      ctx.body = {
        error: '허용되지 않는 이메일 사이트',
      };
      return;
    }

    user = new User({
      username,
      email,
      profileImage,
      loginType,
    });
    await user.save();
    ctx.body = user;
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const check = async (ctx: Context) => {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = user;
};

export const logout = async (ctx: Context) => {
  ctx.cookies.set('access_token');
  ctx.status = 204;
};
