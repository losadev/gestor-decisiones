import request from 'supertest';
import express from 'express';
import prosConsRouter from '../../routes/proCon.routes';
import { ProCon } from '../../models/proCon.model';

const app = express();
app.use(express.json());
app.use('/api/proscons', prosConsRouter);

describe('GET /api/proscons/:id', () => {
  beforeAll(() => {
    jest.spyOn(ProCon, 'findAll').mockResolvedValue([] as any);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return 404 when no pros/cons found', async () => {
    const res = await request(app).get('/api/proscons/1');
    expect(res.status).toBe(404);
  });
});
