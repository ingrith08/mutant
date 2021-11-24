import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import loggerKoa from 'koa-logger';
import cors from 'koa2-cors';
import helmet from 'koa-helmet';
import router from './router';
import errorMiddleWare from './common/middlewares/error';
import config from './config';
import DbConnection from './common/db';

const koaApp = new Koa();

async function main(app = koaApp): Promise<void> {

  try {
    console.log('Connecting to DB');
    await DbConnection.initDb();
  } catch (error) {
    console.log(`Failed DB connection: ${error}`);
  }

  app.use(cors());
  app.use(loggerKoa());
  app.use(bodyparser());
  app.use(helmet());
  app.use(errorMiddleWare);

  app.use(router.routes());

  app.listen(config.application.port || 3000, () => {
    console.log(`Listening on ${config.application.port || 3000}`);
  });
}

export const server = main();

export default koaApp;
