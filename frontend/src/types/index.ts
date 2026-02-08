export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  MANAGER: 'MANAGER',
  staff: 'staff',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export const TableStatus = {
  FREE: 'FREE',
  OCCUPIED: 'OCCUPIED',
  WAITING_PAYMENT: 'WAITING_PAYMENT',
  RESERVED: 'RESERVED',
  CLEANING: 'CLEANING',
} as const;

export type TableStatus = (typeof TableStatus)[keyof typeof TableStatus];

export const OrderStatus = {
  RECEIVED: 'RECEIVED',
  PREPARING: 'PREPARING',
  READY: 'READY',
  DELIVERED: 'DELIVERED',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
