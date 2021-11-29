import { v4 as uuidv4 } from 'uuid';
import { ICustomer } from '../CustomersRepository';

import ICustomersRepository, {
  ICreateCustomerDTO,
  IUpdateCustomerDTO,
  IListCustomerDTO,
} from '../ICustomersRepository';

export default class FakeCustomersRepository implements ICustomersRepository {
  private customers: ICustomer[];

  constructor() {
    this.customers = [];
  }

  public async create(customer: ICreateCustomerDTO): Promise<{ id: string; }> {
    const id = uuidv4();
    this.customers.push({
      id,
      ...customer,
    });

    return { id };
  }

  public async read(id: string): Promise<ICustomer | undefined> {
    return this.customers.find((customer) => customer.id === id);
  }

  public async update(id: string, data: IUpdateCustomerDTO): Promise<ICustomer | undefined> {
    this.customers = this.customers.map((customer) => {
      if (customer.id !== id) return customer;
      return { ...customer, ...data };
    });
    return this.customers.find((customer) => customer.id === id);
  }

  public async delete(id: string): Promise<void> {
    this.customers = this.customers.filter((customer) => customer.id !== id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async list(parameters: IListCustomerDTO): Promise<ICustomer[]> {
    return this.customers;
  }
}
