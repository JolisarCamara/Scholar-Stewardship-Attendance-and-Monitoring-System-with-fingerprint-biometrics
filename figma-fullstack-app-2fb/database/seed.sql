-- Seed data for GLC Scholarship Management System
-- Note: This file should be run after schema.sql

-- Insert sample users (password for all is 'password123')
-- Password hash for 'password123': $2a$10$YourHashHere (you'll need to generate this with bcrypt)

-- Super Admins
INSERT INTO users (name, email, password_hash, role_id) VALUES
  ('Rekha Nahar', 'rekha.nahar@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'super_admin')),
  ('Hao Chin', 'hao.chin@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'super_admin')),
  ('JD Herbolario', 'jd.herbolario@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'super_admin'));

-- Admins
INSERT INTO users (name, email, password_hash, role_id) VALUES
  ('John Herbolario', 'john.herbolario@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'admin')),
  ('Lulu Briones', 'lulu.briones@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'admin')),
  ('Ana Toledo', 'ana.toledo@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'admin')),
  ('Annabelle Manglicmot', 'annabelle.manglicmot@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'admin')),
  ('Rosemarie Rojo', 'rosemarie.rojo@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'admin'));

-- Scholars
INSERT INTO users (name, email, password_hash, role_id) VALUES
  ('Jolisar Camara', 'jolisar.camara@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'scholar')),
  ('John Ford Dacuya', 'johnford.dacuya@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'scholar')),
  ('Joan Loyd Gacal', 'joanloyd.gacal@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'scholar')),
  ('Rica Goyena', 'rica.goyena@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'scholar')),
  ('Ivan Leynes', 'ivan.leynes@goldenlink.ph', '$2a$10$XQKJZQYwXGGVJZVZYWZVZOZVZYWZVZYWZVZYWZVZYWZVZYWZVZYWe', (SELECT id FROM roles WHERE name = 'scholar'));

-- Insert admin details
INSERT INTO admins (user_id, coordinator_placement) VALUES
  ((SELECT id FROM users WHERE email = 'john.herbolario@goldenlink.ph'), 'Admin'),
  ((SELECT id FROM users WHERE email = 'lulu.briones@goldenlink.ph'), 'Admin'),
  ((SELECT id FROM users WHERE email = 'ana.toledo@goldenlink.ph'), 'Admin'),
  ((SELECT id FROM users WHERE email = 'annabelle.manglicmot@goldenlink.ph'), 'Admin'),
  ((SELECT id FROM users WHERE email = 'rosemarie.rojo@goldenlink.ph'), 'Admin');

-- Insert scholar details
INSERT INTO scholars (user_id, program, year_level, stewardship_placement, required_hours, completed_hours, schedule, school_fee_contribution) VALUES
  ((SELECT id FROM users WHERE email = 'jolisar.camara@goldenlink.ph'), 'BSIT', '3RD YEAR', 'Admin', 80, 20, 'Mon-Fri 8AM-12PM', 499.00),
  ((SELECT id FROM users WHERE email = 'johnford.dacuya@goldenlink.ph'), 'BSIT', '3RD YEAR', 'Admin', 70, 50, 'Mon-Fri 1PM-5PM', 1500.00),
  ((SELECT id FROM users WHERE email = 'joanloyd.gacal@goldenlink.ph'), 'BSIT', '3RD YEAR', 'Admin', 60, 10, 'Mon-Wed 9AM-1PM', 3000.00),
  ((SELECT id FROM users WHERE email = 'rica.goyena@goldenlink.ph'), 'BSIT', '3RD YEAR', 'Admin', 40, 60, 'Tue-Thu 2PM-6PM', 8500.00),
  ((SELECT id FROM users WHERE email = 'ivan.leynes@goldenlink.ph'), 'BSIT', '3RD YEAR', 'Admin', 30, 30, 'Mon-Fri 10AM-2PM', 11000.00);

-- Insert sample activity logs
INSERT INTO activity_logs (scholar_id, student_name, student_placement, program, year_level, date, hours_completed, status) VALUES
  ((SELECT id FROM scholars WHERE user_id = (SELECT id FROM users WHERE email = 'jolisar.camara@goldenlink.ph')), 'Jolisar Camara', 'Admin', 'BSIT', '3RD YEAR', '2026-01-07', 20, 'completed'),
  ((SELECT id FROM scholars WHERE user_id = (SELECT id FROM users WHERE email = 'johnford.dacuya@goldenlink.ph')), 'John Ford Dacuya', 'Admin', 'BSIT', '3RD YEAR', '2026-01-07', 50, 'completed'),
  ((SELECT id FROM scholars WHERE user_id = (SELECT id FROM users WHERE email = 'joanloyd.gacal@goldenlink.ph')), 'Joan Loyd Gacal', 'Admin', 'BSIT', '3RD YEAR', '2026-01-07', 10, 'pending'),
  ((SELECT id FROM scholars WHERE user_id = (SELECT id FROM users WHERE email = 'rica.goyena@goldenlink.ph')), 'Rica Mae Goyena', 'Admin', 'BSIT', '3RD YEAR', '2026-01-07', 60, 'completed'),
  ((SELECT id FROM scholars WHERE user_id = (SELECT id FROM users WHERE email = 'ivan.leynes@goldenlink.ph')), 'Ivan Leynes', 'Admin', 'BSIT', '3RD YEAR', '2026-01-07', 30, 'completed');

-- Note: You'll need to hash the passwords properly using bcrypt
-- To generate a proper hash, use Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = await bcrypt.hash('password123', 10);
-- Then replace the placeholder hashes above with the real hash
