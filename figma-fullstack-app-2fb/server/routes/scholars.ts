import { RequestHandler } from 'express';
import pool from '../db';

// Get all scholars
export const handleGetScholars: RequestHandler = async (req, res) => {
  try {
    const query = `
      SELECT 
        s.id,
        u.name,
        u.email,
        s.program,
        s.year_level,
        s.stewardship_placement,
        s.required_hours,
        s.completed_hours,
        s.schedule,
        s.school_fee_contribution
      FROM scholars s
      JOIN users u ON s.user_id = u.id
      ORDER BY u.name ASC
    `;
    
    const result = await pool.query(query);
    res.json({ scholars: result.rows });
  } catch (error) {
    console.error('Get scholars error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get scholar stats
export const handleGetScholarStats: RequestHandler = async (req, res) => {
  try {
    const totalScholarsQuery = `
      SELECT COUNT(*) as count FROM scholars
    `;
    
    const totalAdminsQuery = `
      SELECT COUNT(*) as count FROM admins
    `;
    
    const totalSuperAdminsQuery = `
      SELECT COUNT(*) as count 
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE r.name = 'super_admin'
    `;
    
    const [totalScholars, totalAdmins, totalSuperAdmins] = await Promise.all([
      pool.query(totalScholarsQuery),
      pool.query(totalAdminsQuery),
      pool.query(totalSuperAdminsQuery),
    ]);
    
    res.json({
      totalScholars: parseInt(totalScholars.rows[0].count),
      totalAdmins: parseInt(totalAdmins.rows[0].count),
      totalSuperAdmins: parseInt(totalSuperAdmins.rows[0].count),
    });
  } catch (error) {
    console.error('Get scholar stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete scholar
export const handleDeleteScholar: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get user_id first
    const scholarQuery = await pool.query(
      'SELECT user_id FROM scholars WHERE id = $1',
      [id]
    );
    
    if (scholarQuery.rows.length === 0) {
      return res.status(404).json({ error: 'Scholar not found' });
    }
    
    const userId = scholarQuery.rows[0].user_id;
    
    // Delete user (cascade will delete scholar)
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    
    res.json({ message: 'Scholar deleted successfully' });
  } catch (error) {
    console.error('Delete scholar error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
