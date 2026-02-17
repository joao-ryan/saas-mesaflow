import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  restaurantId: z.string().optional(),
  role: z.enum(['ADMIN', 'OWNER', 'MANAGER', 'STAFF', 'CUSTOMER']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const setupRestaurantSchema = z.object({
  restaurantName: z.string().min(2),
  restaurantSlug: z.string().min(2),
  ownerEmail: z.string().email(),
  ownerPassword: z.string().min(6),
  ownerName: z.string().min(2),
});
