import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import User from '../models/user';

const jwtMiddleware = async (ctx: Context, next: () => void) => {
    const token = ctx.cookies.get('access_token');
    if (!token) return next();
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        ctx.state.user = {
            email: decoded.email,
            username: decoded.username,
            loginType: decoded.loginType,
        };

        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findByEmail(decoded.email);
            const token = user.generateToken();
            ctx.cookies.set('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            })
        }
        return next();
    } catch (e) {
        return next();
    }
}

export default jwtMiddleware;