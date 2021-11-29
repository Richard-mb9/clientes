import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  street: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
});

class ListCustomerValidator {
  // eslint-disable-next-line class-methods-use-this
  public execute(req: Request, res: Response, next: NextFunction) {
    const errors = schema.validate(req.query);
    if (errors.error) return res.status(400).send(errors.error.message);
    return next();
  }
}

export default new ListCustomerValidator();
