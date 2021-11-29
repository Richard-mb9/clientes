import request from 'supertest';
import app from '../serverTest';
import { ICustomer } from '../repository/CustomersRepository';
import { ICreateCustomerDTO, IUpdateCustomerDTO } from '../repository/ICustomersRepository';

const server = request(app);

const defaultCustomer = {
  city: 'test',
  email: 'Pedro@hotmail.com',
  name: 'Pedro',
  street: 'test',
  state: 'test',
  age: 20,
};

const createAndValidatedCustomer = async (
  customer?: ICreateCustomerDTO,
  statusCodeExpected?: number,
) => new Promise<string>((resolve) => {
  server
    .post('/customers')
    .send(customer || defaultCustomer)
    .expect(statusCodeExpected || 201)
    .end((err, res) => {
      if (err) throw new Error('error creating a client for testing');
      return resolve(res.body.id);
    });
});

const readAndValidatedCustomer = (
  id:string,
  statusCodeExpected?: number,
) => new Promise<ICustomer>((resolve) => {
  server
    .get(`/customers/${id}`)
    .send()
    .expect(statusCodeExpected || 200)
    .end((err, res) => {
      if (err) throw new Error('error creating a client for testing');
      return resolve(res.body);
    });
});

const listAndValidatedCustomers = () => new Promise<ICustomer[]>((resolve) => {
  server
    .get('/customers')
    .send()
    .expect(200)
    .end((err, res) => {
      if (err) throw new Error('error listing a client for testing');
      return resolve(res.body);
    });
});

const deleteAndValidatedCustomer = (
  id:string,
  statusCodeExpected?: number,
) => new Promise<ICustomer>((resolve) => {
  server
    .delete(`/customers/${id}`)
    .send()
    .expect(statusCodeExpected || 200)
    .end((err, res) => {
      if (err) throw new Error('error deleting a client for testing');
      return resolve(res.body);
    });
});

const updateAndValidatedCustomer = async (
  id:string,
  dataToUpdate:IUpdateCustomerDTO,
  statusCodeExpected?: number,
) => new Promise<ICustomer>((resolve) => {
  server
    .put(`/customers/${id}`)
    .send(dataToUpdate)
    .expect(statusCodeExpected || 200)
    .end((err, res) => {
      if (err) throw err;
      return resolve(res.body.id);
    });
});

describe('CustomersTest', () => {
  afterEach(async () => {
    const customers = await listAndValidatedCustomers();
    customers.forEach(async (customer) => {
      await deleteAndValidatedCustomer(customer.id);
    });
  });

  it('should create customer returning id', (done) => {
    server
      .post('/customers')
      .send({
        city: 'test',
        email: 'Pedro@hotmail.com',
        name: 'Pedro',
        street: 'test',
        state: 'test',
        age: 20,
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).toBeDefined();
        return done();
      });
  });

  it('should create and read customer', async () => {
    const id = await createAndValidatedCustomer();
    const customer = await readAndValidatedCustomer(id);
    expect(customer.id).toBeDefined();
    expect(customer.name).toEqual(defaultCustomer.name);
  });

  it('should list all customers', async () => {
    for (let i = 0; i < 9; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await createAndValidatedCustomer();
    }

    const customers = await listAndValidatedCustomers();

    expect(customers.length).toBe(9);
  });

  it('should delete customers', async () => {
    const id = await createAndValidatedCustomer();

    await deleteAndValidatedCustomer(id);

    const customer = await readAndValidatedCustomer(id);
    expect(customer.id).not.toBeDefined();
  });

  it('should update customers', async () => {
    const id = await createAndValidatedCustomer();

    await updateAndValidatedCustomer(id, {
      name: 'Joaquin',
      email: 'Joaqui@gmail.com',
    });

    const customer = await readAndValidatedCustomer(id);
    expect(customer.name).toBe('Joaquin');
    expect(customer.email).toBe('Joaqui@gmail.com');
  });

  it('should return status 400 if send incorrect parameters when update customer', async () => {
    const id = await createAndValidatedCustomer();

    const dataToUpdate = {
      invalidParameter: 'invalid',
    } as IUpdateCustomerDTO; // force sending a wrong parameter

    await updateAndValidatedCustomer(id, dataToUpdate, 400);
  });

  it('should return status 400 if send incorrect parameters when create customer', async () => {
    let newCustomer = {
      ...defaultCustomer,
      invalidParameter: 'invalid',
    } as ICreateCustomerDTO;// force sending a wrong parameter

    await createAndValidatedCustomer(newCustomer, 400);

    newCustomer = {
      age: defaultCustomer.age,
      email: defaultCustomer.email,
      city: defaultCustomer.city,
      state: defaultCustomer.state,
    } as ICreateCustomerDTO;// force sending a wrong parameter

    await createAndValidatedCustomer(newCustomer, 400);
  });
});
