import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  age: Joi.number().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
});

class CreateCustomerValidator {
  // eslint-disable-next-line class-methods-use-this
  public execute(req: Request, res: Response, next: NextFunction) {
    const errors = schema.validate(req.body);
    if (errors.error) return res.status(400).send(errors.error.message);
    return next();
  }
}

export default new CreateCustomerValidator();
