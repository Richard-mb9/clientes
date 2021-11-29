import CustomersRepository, {
  ICustomer,
} from '../repository/CustomersRepository';

import ICustomersRepository, {
  ICreateCustomerDTO,
  IUpdateCustomerDTO,
  IListCustomerDTO,
} from '../repository/ICustomersRepository';

export default class CustomersService {
  private Repository: CustomersRepository;

  constructor(repository: ICustomersRepository) {
    this.Repository = repository;
  }

  public async read(id:string): Promise<ICustomer | undefined> {
    return this.Repository.read(id);
  }

  public async create(customer:ICreateCustomerDTO) {
    return this.Repository.create(customer);
  }

  public async update(id: string, data: IUpdateCustomerDTO) {
    return this.Repository.update(id, data);
  }

  public async delete(id: string) {
    return this.Repository.delete(id);
  }

  public async list(params: IListCustomerDTO) {
    return this.Repository.list(params);
  }
}
