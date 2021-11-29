import { container } from 'tsyringe';
import ICustomersRepository from '../repository/ICustomersRepository';
import CustomersRepository from '../repository/CustomersRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);
