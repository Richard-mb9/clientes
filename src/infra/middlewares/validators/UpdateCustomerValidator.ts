import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object().keys({
  id: Joi.string()
    .guid({ version: 'uuidv4', separator: '-' })
    .required(),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  age: Joi.number().optional(),
  street: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
});

class UpdateCustomerValidator {
  // eslint-disable-next-line class-methods-use-this
  public execute(req: Request, res: Response, next: NextFunction) {
    const errors = schema.validate({ ...req.params, ...req.body });
    if (errors.error) return res.status(400).send(errors.error.message);
    return next();
  }
}

export default new UpdateCustomerValidator();
