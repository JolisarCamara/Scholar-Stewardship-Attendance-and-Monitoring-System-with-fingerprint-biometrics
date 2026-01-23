import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'glc-scholarship-secret-key-change-in-production';

// Login handler
export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email with role information
    const userQuery = `
      SELECT u.id, u.email, u.password_hash, u.name, r.name as role
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = $1
    `;
    
    const result = await pool.query(userQuery, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Register handler
export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Get role ID
    const roleQuery = await pool.query(
      'SELECT id FROM roles WHERE name = $1',
      [role]
    );

    if (roleQuery.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const roleId = roleQuery.rows[0].id;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await pool.query(
      `INSERT INTO users (email, password_hash, name, role_id) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, name`,
      [email, hashedPassword, name, roleId]
    );

    // If scholar, create scholar record
    if (role === 'scholar' && req.body.scholarData) {
      const { program, year_level, stewardship_placement, required_hours, schedule, school_fee_contribution } = req.body.scholarData;
      
      await pool.query(
        `INSERT INTO scholars (user_id, program, year_level, stewardship_placement, required_hours, schedule, school_fee_contribution)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [newUser.rows[0].id, program, year_level, stewardship_placement, required_hours, schedule, school_fee_contribution]
      );
    }

    // If admin, create admin record
    if (role === 'admin' && req.body.adminData) {
      const { coordinator_placement } = req.body.adminData;
      
      await pool.query(
        `INSERT INTO admins (user_id, coordinator_placement)
         VALUES ($1, $2)`,
        [newUser.rows[0].id, coordinator_placement]
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.rows[0].id, email: newUser.rows[0].email, role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.rows[0].id,
        email: newUser.rows[0].email,
        name: newUser.rows[0].name,
        role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get current user
export const handleGetMe: RequestHandler = async (req, res) => {
  try {
    const authReq = req as any;
    const userId = authReq.user.id;

    const userQuery = `
      SELECT u.id, u.email, u.name, r.name as role
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = $1
    `;
    
    const result = await pool.query(userQuery, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
