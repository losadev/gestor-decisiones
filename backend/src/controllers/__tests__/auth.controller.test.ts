import request from 'supertest';
import express from 'express';
import authRouter from '../../routes/auth.routes';

const app = express();
app.use(express.json());
app.use('/api/login', authRouter);

describe('POST /api/login', () => {
  it('should return 400 for invalid input', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'not-an-email', password: '' });
    expect(res.status).toBe(400);
  });
});

