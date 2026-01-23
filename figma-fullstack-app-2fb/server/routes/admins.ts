import { RequestHandler } from 'express';
import pool from '../db';

// Get all admins
export const handleGetAdmins: RequestHandler = async (req, res) => {
  try {
    const query = `
      SELECT 
        a.id,
        u.name,
        u.email,
        a.coordinator_placement
      FROM admins a
      JOIN users u ON a.user_id = u.id
      ORDER BY u.name ASC
    `;
    
    const result = await pool.query(query);
    res.json({ admins: result.rows });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all super admins
export const handleGetSuperAdmins: RequestHandler = async (req, res) => {
  try {
    const query = `
      SELECT 
        u.id,
        u.name,
        u.email
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE r.name = 'super_admin'
      ORDER BY u.name ASC
    `;
    
    const result = await pool.query(query);
    res.json({ superAdmins: result.rows });
  } catch (error) {
    console.error('Get super admins error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete admin
export const handleDeleteAdmin: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get user_id first
    const adminQuery = await pool.query(
      'SELECT user_id FROM admins WHERE id = $1',
      [id]
    );
    
    if (adminQuery.rows.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    
    const userId = adminQuery.rows[0].user_id;
    
    // Delete user (cascade will delete admin)
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
