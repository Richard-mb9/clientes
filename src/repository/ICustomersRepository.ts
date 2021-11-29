import { ICustomer } from './CustomersRepository';

export interface ICreateCustomerDTO {
    name: string;
    email: string;
    age: number;
    street: string;
    city: string;
    state: string;
}

export interface IUpdateCustomerDTO {
    name?: string;
    email?: string;
    age?: number;
    street?: string;
    city?: string;
    state?: string;
}

export interface IListCustomerDTO {
    name?: string;
    email?: string;
    age?: number;
    street?: string;
    city?: string;
    state?: string;
}

export default interface ICustomerRepository {
    create(customer: ICreateCustomerDTO): Promise<{id: string}>,
    read(id: string):Promise<ICustomer | undefined>,
    update(id: string, data: IUpdateCustomerDTO): Promise<ICustomer | undefined>,
    delete(id:string): Promise<void>;
    list(params:IListCustomerDTO):Promise<ICustomer[]>,
// eslint-disable-next-line semi
}
