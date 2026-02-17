import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

export class AuthService {
  static async register(data: any) {
    const { email, password, name, restaurantId, role } = data;

    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      throw new Error('Usuário com este e-mail já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const query = `
      INSERT INTO users (email, password, name, restaurant_id, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, name, role, restaurant_id, created_at
    `;
    const values = [email, hashedPassword, name, restaurantId, role || 'CUSTOMER'];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async login(data: any) {
    const { email, password } = data;

    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('E-mail ou senha inválidos');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, restaurantId: user.restaurant_id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    // Não retorna a senha no objeto de resposta
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}

export default AuthService;
