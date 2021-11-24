import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import supertest from 'supertest';
import statController from './stat';
import Mutant from '../repositories/Mutant';

const payload = {
    dna: ["AAAA", "AATG", "AAGC", "CCCC"],
    isMutant: true,
  };

Mutant.getStat = jest.fn(() => new Mutant(payload) as any);

describe('Stats Endpoint', () => {
  let app: Koa;

  beforeAll(() => {
    app = new Koa();
    app.use(bodyParser());
    const router = new Router();
    router.get('/stats', statController.GetStat);

    app.use(router.routes()).use(router.allowedMethods());
  });

  it('should return a 200 response GetStat', async () => {
    const response = await supertest(app.callback())
      .get('/stats')
      .set('Content-type', 'application/json')

    expect(response.status).toBe(200);
  });

});
