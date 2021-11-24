import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import supertest from 'supertest';
import mutantController from './mutant';
import Mutant from '../repositories/Mutant';

const payload = {
  hash: "5513f4ef921938e1e782e346247f2855939d002a",
  dna: ["AAAA", "AATG", "AAGC", "CCCC"],
  isMutant: true,
};

Mutant.findOne = jest.fn(() => new Mutant(payload) as any);

describe('Copons Endpoint', () => {
  let app: Koa;

  beforeAll(() => {
    app = new Koa();
    app.use(bodyParser());
    const router = new Router();
    router.post('/mutant', mutantController.IsMutant);
    app.use(router.routes()).use(router.allowedMethods());
  });

  it('should return a 200 response isMutant', async () => {
    const response = await supertest(app.callback())
      .post('/mutant')
      .set('Content-type', 'application/json')
      .send({
        dna: ["AAAA", "AATG", "AAGC", "CCCC"]
      });

    const { body } = response;

    expect(body).toBe(true);
    expect(response.status).toBe(200);
  });

  it('should return a 403 response isMutant', async () => {
    const response = await supertest(app.callback())
      .post('/mutant')
      .set('Content-type', 'application/json')
      .send({
        dna: ["AAAC", "GGTG", "TTGC", "CGGT"]
      });

    expect(response.status).toBe(403);
  });
});
