import { Router } from 'express';
import authRoutes from './auth.routes';
import restaurantRoutes from './restaurant.routes';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to MesaFlow API v1' });
});

router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);

export default router;
