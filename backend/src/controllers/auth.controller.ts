import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({
      status: 'success',
      data: { user }
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await AuthService.login(req.body);
    res.status(200).json({
      status: 'success',
      data: { user, token }
    });
  } catch (error: any) {
    res.status(401).json({
      status: 'error',
      message: error.message
    });
  }
};
