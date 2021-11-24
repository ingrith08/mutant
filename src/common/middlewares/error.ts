import { Middleware } from 'koa';
import CustomError from '../CustomError';

const errorMiddleWare: Middleware<Record<string, unknown>> = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const error = err as CustomError;
    ctx.response.status = error.statusCode || 500;

    ctx.response.body = {
      name: error.name,
      message: error.message,
    };
  }
};

export default errorMiddleWare;
