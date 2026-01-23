# GLC Scholarship Management System

A comprehensive full-stack scholarship management system built for GLC (Golden Link College) to manage scholars, admins, stewardship hours, and activity logs.

![GLC Scholarship System](https://img.shields.io/badge/Status-Production%20Ready-green)

## 🎯 Features

- **Multi-Role Authentication** - Super Admin, Admin, and Scholar roles with JWT authentication
- **Scholar Management** - Track scholars, programs, stewardship hours, and placements
- **Admin Management** - Manage admin accounts and coordinator placements
- **Activity Logs** - Record and monitor student stewardship activities
- **Rules & Policies** - Display scholarship rules and hour requirements
- **Responsive Design** - Pixel-perfect implementation of Figma designs
- **Secure Backend** - PostgreSQL database with bcrypt password hashing

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe development
- **Tailwind CSS 3** - Utility-first styling
- **React Router 6** - Client-side routing
- **Tanstack Query** - Server state management

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing

## 📋 Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL 14+
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd glc-scholarship-system
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/glc_scholarship

# JWT Secret (change in production!)
JWT_SECRET=glc-scholarship-secret-key-change-in-production

# Server
PORT=8080
NODE_ENV=development

# Optional
PING_MESSAGE=pong
```

### 4. Set Up the Database

```bash
# Create the database
createdb glc_scholarship

# Run the schema
psql -d glc_scholarship -f database/schema.sql

# Seed with sample data (optional)
psql -d glc_scholarship -f database/seed.sql
```

**Note:** The seed file uses placeholder password hashes. For proper hashing, generate real bcrypt hashes:

```javascript
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash('password123', 10);
console.log(hash); // Use this in your SQL
```

### 5. Run the Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:8080`

## 👤 Default Login Credentials

After seeding the database (with proper password hashes):

**Super Admin:**
- Email: `rekha.nahar@goldenlink.ph`
- Password: `password123`

**Admin:**
- Email: `john.herbolario@goldenlink.ph`
- Password: `password123`

**Scholar:**
- Email: `jolisar.camara@goldenlink.ph`
- Password: `password123`

## 📁 Project Structure

```
glc-scholarship-system/
├── client/                 # Frontend React application
│   ├── components/         # Reusable components
│   │   └── layouts/        # Layout components (Sidebar, Dashboard)
│   ├── contexts/           # React contexts (Auth)
│   ├── pages/              # Page components
│   ├── App.tsx             # App entry with routing
│   └── global.css          # Global styles & Tailwind
├── server/                 # Backend Express application
│   ├── middleware/         # Express middleware (auth)
│   ├── routes/             # API route handlers
│   ├── db.ts               # Database connection
│   └── index.ts            # Server setup
├── database/               # Database files
│   ├── schema.sql          # Database schema
│   └── seed.sql            # Sample data
├── shared/                 # Shared types
└── package.json            # Dependencies and scripts
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Scholars
- `GET /api/scholars` - Get all scholars
- `GET /api/scholars/stats` - Get scholar statistics
- `DELETE /api/scholars/:id` - Delete a scholar

### Admins
- `GET /api/admins` - Get all admins (Super Admin only)
- `GET /api/super-admins` - Get all super admins (Super Admin only)
- `DELETE /api/admins/:id` - Delete an admin (Super Admin only)

### Activity Logs
- `GET /api/activity-logs` - Get all activity logs
- `POST /api/activity-logs` - Create activity log
- `PATCH /api/activity-logs/:id/status` - Update log status

## 🎨 Design System

The application uses a custom color palette from the Figma design:

- **Navy Dark:** `#29354F` - Primary background
- **Navy Darker:** `#1A2238` - Headers, text
- **Gold:** `#C0995A` - Action buttons
- **Blue Active:** `#428BCE` - Active states
- **Gray Background:** `#E6E6E6` - Page background

## 📦 Build & Deployment

### Build for Production

```bash
pnpm build
```

This creates:
- `dist/spa/` - Client build
- `dist/server/` - Server build

### Start Production Server

```bash
pnpm start
```

### Deploy to Netlify

The application is configured for Netlify deployment:

1. Connect your Netlify MCP integration
2. Use the Netlify MCP tools to deploy
3. Set environment variables in Netlify dashboard

### Deploy to Vercel

1. Connect your Vercel MCP integration
2. Use the Vercel MCP tools to deploy
3. Set environment variables in Vercel dashboard

## 🧪 Testing

```bash
pnpm test
```

## 📝 Development Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format.fix` - Format code with Prettier

## 🔒 Security Notes

1. **Change the JWT_SECRET** in production
2. **Use strong passwords** for all accounts
3. **Enable SSL/TLS** in production PostgreSQL connections
4. **Set secure CORS** origins in production
5. **Never commit** `.env` files

## 📚 Database Schema

The system uses the following main tables:

- **users** - All user accounts
- **roles** - User roles (super_admin, admin, scholar)
- **scholars** - Scholar-specific information
- **admins** - Admin-specific information
- **activity_logs** - Student activity tracking
- **stewardship_rules** - Scholarship rules and policies

See `database/schema.sql` for the complete schema.

## 🤝 Contributing

This is a custom application built for GLC. For modifications or enhancements, please contact the development team.

## 📄 License

Proprietary - All rights reserved by Golden Link College

## 🆘 Support

For issues or questions:
- Check the documentation
- Review the database schema
- Contact the development team

---

**Built with ❤️ for Golden Link College (GLC)**

**GLC © 2002**
