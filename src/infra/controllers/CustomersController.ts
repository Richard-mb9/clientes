import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import ICustomersRepository, { ICreateCustomerDTO, IUpdateCustomerDTO, IListCustomerDTO } from '../../repository/ICustomersRepository';

import CustomersService from '../../services/CustomersService';

@injectable()
export default class CustomersController {
  private service: CustomersService;

  constructor(
        @inject('CustomersRepository')
          repository: ICustomersRepository,
  ) {
    this.service = new CustomersService(repository);
  }

  public async read(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.service.read(id);
      return res.json(result).status(200);
    } catch (error:any) {
      return res.status(500).send(error.toString());
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const customer = req.body as ICreateCustomerDTO;
      const result = await this.service.create(customer);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).send(error.toString());
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body as IUpdateCustomerDTO;
      const result = await this.service.update(id, data);
      return res.status(200).json(result);
    } catch (error:any) {
      return res.status(500).send(error.toString());
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.service.delete(id);
      return res.json(result).status(204);
    } catch (error:any) {
      return res.status(500).send(error.toString());
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const params = req.query as IListCustomerDTO;
      const result = await this.service.list(params);
      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.toString());
    }
  }
}
