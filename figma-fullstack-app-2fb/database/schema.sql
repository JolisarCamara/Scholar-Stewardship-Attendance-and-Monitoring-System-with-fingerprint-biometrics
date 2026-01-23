-- GLC Scholarship Management System Database Schema

-- Roles table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (name) VALUES 
  ('super_admin'),
  ('admin'),
  ('scholar');

-- Users table (for all user types)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scholars table (extended information for scholar users)
CREATE TABLE scholars (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  program VARCHAR(100),
  year_level VARCHAR(20),
  stewardship_placement VARCHAR(255),
  required_hours INTEGER DEFAULT 0,
  completed_hours INTEGER DEFAULT 0,
  schedule VARCHAR(255),
  school_fee_contribution DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins table (extended information for admin users)
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  coordinator_placement VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity logs table
CREATE TABLE activity_logs (
  id SERIAL PRIMARY KEY,
  scholar_id INTEGER REFERENCES scholars(id) ON DELETE CASCADE,
  student_name VARCHAR(255),
  student_placement VARCHAR(255),
  program VARCHAR(100),
  year_level VARCHAR(20),
  date DATE NOT NULL,
  hours_completed INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stewardship rules table
CREATE TABLE stewardship_rules (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default stewardship rules
INSERT INTO stewardship_rules (title, description) VALUES
  ('Stewardship Program for GLC Scholarship', 'The GLC Scholarship requires scholars to complete stewardship service hours as part of the college''s commitment to service, volunteerism, and community involvement. This requirement is necessary for scholarship retention and renewal.'),
  ('Fourth-year students with OJT/internship', 'Fourth-year students with OJT/internship must complete at least half of the required hours.'),
  ('Completion deadline', 'Required stewardship hours must be completed before the end of the semester for scholarship renewal.'),
  ('Verification requirement', 'Stewardship hours must be verified and signed by the supervisor on the same day or within three (3) days.'),
  ('Summer stewardship', 'Summer stewardship is allowed with prior approval from SAO and the supervisor.'),
  ('Absence policy', 'More than 3 absences (without approved academic reasons) result in an additional ₱500 student payment per absence.'),
  ('Disqualification', 'More than 5 absences will lead to disqualification from the scholarship.'),
  ('Uniform requirement', 'Proper uniform is required (regular uniform or GLC Yellow shirt only).'),
  ('Break time policy', 'Break time and lunch are not counted as stewardship hours.');

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role_id);
CREATE INDEX idx_scholars_user ON scholars(user_id);
CREATE INDEX idx_admins_user ON admins(user_id);
CREATE INDEX idx_activity_logs_scholar ON activity_logs(scholar_id);
CREATE INDEX idx_activity_logs_date ON activity_logs(date);
CREATE INDEX idx_activity_logs_status ON activity_logs(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scholars_updated_at BEFORE UPDATE ON scholars 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activity_logs_updated_at BEFORE UPDATE ON activity_logs 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
