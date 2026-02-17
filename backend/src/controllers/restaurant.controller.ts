import { Request, Response } from 'express';
import RestaurantService from '../services/restaurant.service';

export const setupRestaurant = async (req: Request, res: Response) => {
  try {
    const result = await RestaurantService.registerWithTable(req.body);
    res.status(201).json({
      status: 'success',
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getRestaurantDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantService.getById(id as string);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante não encontrado' });
    }
    res.status(200).json({ status: 'success', data: restaurant });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
