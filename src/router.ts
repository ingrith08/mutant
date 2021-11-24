import Router from 'koa-router';
import validation from './common/middlewares/validation';
import mutant from './controllers/mutant';
import stat from './controllers/stat';

const router = new Router();

router.get('/healtcheck', async (ctx) => {
  ctx.status = 200;
  ctx.body = 'ok';
});

router.get('/stats', stat.GetStat);
router.post('/mutant', validation, mutant.IsMutant);

export default router;
