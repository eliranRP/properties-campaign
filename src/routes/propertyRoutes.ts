import { Router } from 'express';
import { PropertyController } from '../controllers/propertyController';

const router = Router();
const propertyController = new PropertyController();

router.post('/property', (req, res) =>
  propertyController.getPropertyData(req, res)
);

export default router;
