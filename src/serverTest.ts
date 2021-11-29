import 'reflect-metadata';
import './utils/container';
import Express from 'express';

import CustomersRoutes from './infra/routes';
import FakeCustomersRepository from './repository/fakes/FakeCustomersRepository';
import CustomersController from './infra/controllers/CustomersController';

const fakeCustomersRepository = new FakeCustomersRepository();
const controller = new CustomersController(fakeCustomersRepository);

const app = Express();
app.use(Express.json());

app.use('/', CustomersRoutes(controller));

export default app;
