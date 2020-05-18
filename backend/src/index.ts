import Koa, { Context } from 'koa';
const app = new Koa();

app.use(async (ctx: Context, next: () => void) => {
  const msg: string = 'Hello World';
  ctx.body = msg;
  next();
});

app.listen(3000, () => {
  console.log('start koa server at http://localhost:3000');
});
