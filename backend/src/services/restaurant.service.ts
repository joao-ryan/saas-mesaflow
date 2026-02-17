import bcrypt from 'bcryptjs';
import pool from '../config/database';

export class RestaurantService {
  static async registerWithTable(data: any) {
    const {
      restaurantName,
      restaurantSlug,
      ownerEmail,
      ownerPassword,
      ownerName
    } = data;

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // 1. Cria o Restaurante
      const restaurantQuery = `
        INSERT INTO restaurants (name, slug)
        VALUES ($1, $2)
        RETURNING *
      `;
      const restaurantResult = await client.query(restaurantQuery, [restaurantName, restaurantSlug]);
      const restaurant = restaurantResult.rows[0];

      // 2. Cria o Usuário Proprietário
      const hashedPassword = await bcrypt.hash(ownerPassword, 12);
      const userQuery = `
        INSERT INTO users (email, password, name, restaurant_id, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, email, name, role, restaurant_id
      `;
      const userValues = [ownerEmail, hashedPassword, ownerName, restaurant.id, 'OWNER'];
      const userResult = await client.query(userQuery, userValues);
      const user = userResult.rows[0];

      await client.query('COMMIT');
      return { restaurant, user };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getById(id: string) {
    const restaurantQuery = 'SELECT * FROM restaurants WHERE id = $1';
    const restaurantResult = await pool.query(restaurantQuery, [id]);
    const restaurant = restaurantResult.rows[0];

    if (!restaurant) return null;

    // Busca categorias e produtos associados
    const categoriesQuery = 'SELECT * FROM categories WHERE restaurant_id = $1';
    const categoriesResult = await pool.query(categoriesQuery, [id]);

    const productsQuery = 'SELECT * FROM products WHERE restaurant_id = $1';
    const productsResult = await pool.query(productsQuery, [id]);

    return {
      ...restaurant,
      categories: categoriesResult.rows,
      products: productsResult.rows
    };
  }
}

export default RestaurantService;
