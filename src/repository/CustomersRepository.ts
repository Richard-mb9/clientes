import { v4 as uuidv4 } from 'uuid';
import { ScanInput } from 'aws-sdk/clients/dynamodb';
import dynamoDb from '../infra/dynamodb';

import ICustomersRepository, {
  ICreateCustomerDTO,
  IUpdateCustomerDTO,
  IListCustomerDTO,
} from './ICustomersRepository';

import { buildExpressionsList } from '../utils/buildExpressions';

export interface ICustomer {
    id:string;
    name: string;
    email: string;
    age: number;
    street: string;
    city: string;
    state: string;
}

export default class CustomersRepository implements ICustomersRepository {
  public async read(id: string): Promise<ICustomer | undefined> {
    const params = {
      TableName: 'customers',
      Key: {
        id,
      },
    };

    const result = await dynamoDb.get(params).promise();
    return result.Item as ICustomer;
  }

  public async create(customer: ICreateCustomerDTO) {
    const id = uuidv4();
    const params = {
      TableName: 'customers',
      Item: { id, ...customer },
    };
    await dynamoDb.put(params).promise();
    return { id };
  }

  public async update(id: string, data:IUpdateCustomerDTO) {
    const params = {
      TableName: 'customers',
      Item: { id, ...data },
    };

    await dynamoDb.put(params).promise();
    return this.read(id);
  }

  public async delete(id:string) {
    const params = {
      TableName: 'customers',
      Key: {
        id,
      },
    };

    await dynamoDb.delete(params).promise();
  }

  public async list(parameters: IListCustomerDTO): Promise<ICustomer[]> {
    const expression = buildExpressionsList(parameters);
    const params = {
      ...expression,
      TableName: 'customers',
    } as ScanInput;
    const result = await dynamoDb.scan(params).promise();
    return result.Items as ICustomer[];
  }
}
