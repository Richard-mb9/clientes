import Express, { Request, Response } from 'express';
import { container } from 'tsyringe';
import CustomersController from '../controllers/CustomersController';
import CreateCustomerValidator from '../middlewares/validators/CreateCustomerValidator';
import ReadCustomerValidator from '../middlewares/validators/ReadCustomerValidator';
import DeleteCustomerValidator from '../middlewares/validators/DeleteCustomerValidator';
import UpdateCustomerValidator from '../middlewares/validators/UpdateCustomerValidator';
import ListCustomerValidator from '../middlewares/validators/ListCustomerValidator';

const customersController = container.resolve(CustomersController);

const createRouter = (controller = customersController) => {
  const router = Express.Router();

  router.get(
    '/customers',
    ListCustomerValidator.execute,
    async (req: Request, res: Response) => controller.list(req, res),
  );

  router.get(
    '/customers/:id',
    ReadCustomerValidator.execute,
    (req: Request, res: Response) => controller.read(req, res),
  );

  router.post(
    '/customers',
    CreateCustomerValidator.execute,
    (req: Request, res: Response) => controller.create(req, res),
  );

  router.put(
    '/customers/:id',
    UpdateCustomerValidator.execute,
    (req: Request, res: Response) => controller.update(req, res),
  );

  router.delete(
    '/customers/:id',
    DeleteCustomerValidator.execute,
    (req: Request, res: Response) => controller.delete(req, res),
  );

  return router;
};

export default createRouter;
