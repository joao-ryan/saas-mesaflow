import { Router } from 'express';
import { setupRestaurant, getRestaurantDetails } from '../controllers/restaurant.controller';
import { validate } from '../middlewares/validation.middleware';
import { setupRestaurantSchema } from '../utils/validators';

const router = Router();

router.post('/setup', validate(setupRestaurantSchema), setupRestaurant);
router.get('/:id', getRestaurantDetails);

export default router;
