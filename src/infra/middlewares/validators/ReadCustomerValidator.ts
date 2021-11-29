import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object().keys({
  id: Joi.string()
    .guid({ version: 'uuidv4', separator: '-' })
    .required(),
});

class ReadCustomerValidator {
  // eslint-disable-next-line class-methods-use-this
  public execute(req: Request, res: Response, next: NextFunction) {
    const errors = schema.validate(req.params);
    if (errors.error) return res.status(400).send(errors.error.message);
    return next();
  }
}

export default new ReadCustomerValidator();
