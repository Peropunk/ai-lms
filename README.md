# AI LMS - Learning Management System

A full-stack Learning Management System built with Next.js frontend and Node.js backend, connected to Supabase database.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The `.env` file has been configured with your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hlbequeurrlplcacogss.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database Configuration
DATABASE_URL=postgresql://postgres:p@rv80057@db.hlbequeurrlplcacogss.supabase.co:5432/postgres

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 3. Database Setup

1. Go to your Supabase dashboard: https://hlbequeurrlplcacogss.supabase.co
2. Navigate to the SQL Editor
3. Copy and paste the contents of `scripts/setup-database.sql`
4. Run the script to create tables and set up Row Level Security

### 4. Running the Application

#### Option 1: Run Frontend and Backend Separately

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server:dev
```

#### Option 2: Run Both Simultaneously
```bash
npm run dev:all
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Database Test**: http://localhost:3001/test-db

## Project Structure

```
├── components/          # React components
├── pages/              # Next.js pages
├── server/             # Backend server
│   ├── index.js        # Main server file
│   ├── database.js     # Database helper functions
│   └── routes/         # API routes
│       ├── auth.js     # Authentication routes
│       └── users.js    # User management routes
├── utils/              # Utility functions
│   ├── api.js          # API client for frontend
│   ├── auth.js         # Authentication helpers
│   └── supabase.js     # Supabase client configuration
├── scripts/            # Database scripts
│   └── setup-database.sql
└── .env                # Environment variables
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/user` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### System
- `GET /health` - Health check
- `GET /test-db` - Test database connection

## Database Schema

The database includes the following tables:
- `users` - User accounts and profiles
- `courses` - Course information
- `enrollments` - User course enrollments
- `lessons` - Course lessons and content

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Development**: Nodemon, Concurrently

## Development Notes

- The backend server runs on port 3001 by default
- Frontend development server runs on port 3000
- Database connection is configured through Supabase
- Row Level Security (RLS) is enabled for data protection
- CORS is configured to allow frontend-backend communication