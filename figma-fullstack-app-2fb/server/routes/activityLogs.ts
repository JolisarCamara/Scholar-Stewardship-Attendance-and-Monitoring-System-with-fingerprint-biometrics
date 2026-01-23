import { RequestHandler } from 'express';
import pool from '../db';

// Get all activity logs
export const handleGetActivityLogs: RequestHandler = async (req, res) => {
  try {
    const query = `
      SELECT 
        al.id,
        al.student_name,
        al.student_placement,
        al.program,
        al.year_level,
        al.date,
        al.hours_completed,
        al.status,
        al.created_at
      FROM activity_logs al
      ORDER BY al.date DESC, al.created_at DESC
    `;
    
    const result = await pool.query(query);
    res.json({ activityLogs: result.rows });
  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create activity log
export const handleCreateActivityLog: RequestHandler = async (req, res) => {
  try {
    const { 
      scholar_id, 
      student_name, 
      student_placement, 
      program, 
      year_level, 
      date, 
      hours_completed,
      status = 'pending'
    } = req.body;

    if (!student_name || !date || !hours_completed) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const result = await pool.query(
      `INSERT INTO activity_logs (
        scholar_id, student_name, student_placement, program, year_level, date, hours_completed, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [scholar_id, student_name, student_placement, program, year_level, date, hours_completed, status]
    );

    res.status(201).json({ activityLog: result.rows[0] });
  } catch (error) {
    console.error('Create activity log error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update activity log status
export const handleUpdateActivityLogStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const result = await pool.query(
      `UPDATE activity_logs SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Activity log not found' });
    }

    res.json({ activityLog: result.rows[0] });
  } catch (error) {
    console.error('Update activity log error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
