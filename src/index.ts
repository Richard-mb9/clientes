import 'reflect-metadata';
import './utils/container';
import Express from 'express';
import path from 'path';

import CustomersRoutes from './infra/routes';

const app = Express();
app.use(Express.json());

app.get('/doc', (req, res) => {
  const root = path.join(__dirname, '..');
  return res.sendFile('redoc-static.html', {
    root,
  });
});

app.use('/', Express.static('/index.html'));
app.use('/', CustomersRoutes());

export default app;
