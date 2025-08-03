const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

// Load environment variables FIRST
dotenv.config();

// Import database after environment variables are loaded
const sql = require('./db.js');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// CORS configuration - simple version to avoid issues
app.use(cors());

// Static files
app.use(express.static('public'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    console.log('Testing database connection...');
    const result = await sql`SELECT NOW() as current_time, 'Database connected!' as message`;
    
    res.json({
      success: true,
      message: 'Database connection successful',
      data: result[0]
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Auth routes - NEW POSTGRESQL VERSION
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('=== POSTGRESQL LOGIN REQUEST ===');
    console.log('Request body:', req.body);

    const { email, password, role } = req.body;

    // Basic validation
    if (!email || !password || !role) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Email, password, and role are required'
      });
    }

    // Validate role
    if (!['admin', 'teacher', 'student', 'staff'].includes(role)) {
      console.log('Invalid role:', role);
      return res.status(400).json({
        success: false,
        message: 'Valid role is required (admin, teacher, student, staff)'
      });
    }

    console.log(`Attempting PostgreSQL login for: ${email} as ${role}`);

    try {
      // Test database connection first
      console.log('Testing database connection...');
      await sql`SELECT 1 as connection_test`;
      console.log('✅ Database connection test passed');

      // Query the specific role collection using native MongoDB
      console.log(`Querying ${role} collection for email: ${email}`);
      
      const users = await sql.find(role, { email: email }, { 
        projection: { _id: 1, email: 1, password: 1, name: 1 } 
      });

      console.log(`Found ${users.length} users with email ${email} in ${role} collection`);

      if (users.length === 0) {
        console.log('❌ No user found with this email in the specified role collection');
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const user = users[0];
      console.log('✅ User found:', { 
        _id: user._id, 
        email: user.email, 
        name: user.name,
        storedPassword: user.password,
        storedPasswordType: typeof user.password
      });

      // Check password - handle both string and numeric passwords
      const storedPassword = String(user.password);
      const providedPassword = String(password);

      console.log('Password comparison:');
      console.log('  Stored password:', storedPassword);
      console.log('  Provided password:', providedPassword);
      console.log('  Match:', storedPassword === providedPassword);

      if (storedPassword !== providedPassword) {
        console.log('❌ Password mismatch');
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      console.log('✅ Login successful!');

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user._id, 
          email: user.email, 
          role: role,
          name: user.name 
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      console.log('✅ JWT token generated successfully');

      return res.status(200).json({
        success: true,
        message: `Login successful - Welcome ${role}!`,
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: role
        }
      });

    } catch (dbError) {
      console.error('❌ Database error details:', {
        message: dbError.message,
        code: dbError.code,
        detail: dbError.detail,
        hint: dbError.hint
      });

      return res.status(500).json({
        success: false,
        message: `Database error: ${dbError.message || 'Unknown database error'}`,
        error: dbError.code || 'UNKNOWN_DB_ERROR'
      });
    }
  } catch (error) {
    console.error('❌ Login error:', error);
    return res.status(500).json({
      success: false,
      message: `Server error during login: ${error.message}`,
      error: error.toString()
    });
  }
});

// Logout route
app.post('/api/auth/logout', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Token verification route
app.get('/api/auth/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    );

    return res.status(200).json({
      success: true,
      user: decoded
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Students API route - fetch all students
app.get('/api/students', async (req, res) => {
  try {
    console.log('=== FETCHING ALL STUDENTS ===');

    // Query all students from the student collection using native MongoDB
    const students = await sql.find('student', {}, { sort: { _id: 1 } });

    console.log(`✅ Found ${students.length} students in database`);

    return res.status(200).json({
      success: true,
      message: `Successfully fetched ${students.length} students`,
      data: students,
      count: students.length
    });

  } catch (error) {
    console.error('❌ Error fetching students:', error);
    return res.status(500).json({
      success: false,
      message: `Failed to fetch students: ${error.message}`,
      error: error.code || 'UNKNOWN_ERROR'
    });
  }
});

// Teachers API route - fetch all teachers
app.get('/api/teachers', async (req, res) => {
  try {
    console.log('=== FETCHING ALL TEACHERS ===');

    // Query all teachers from the teacher collection using native MongoDB
    const teachers = await sql.find('teacher', {}, { sort: { _id: 1 } });

    console.log(`✅ Found ${teachers.length} teachers in database`);

    return res.status(200).json({
      success: true,
      message: `Successfully fetched ${teachers.length} teachers`,
      data: teachers,
      count: teachers.length
    });

  } catch (error) {
    console.error('❌ Error fetching teachers:', error);
    return res.status(500).json({
      success: false,
      message: `Failed to fetch teachers: ${error.message}`,
      error: error.code || 'UNKNOWN_ERROR'
    });
  }
});

// Grades API route - fetch all grades
app.get('/api/grades', async (req, res) => {
  try {
    console.log('=== FETCHING ALL GRADES ===');

    // Query all grades from the grade collection using native MongoDB
    const grades = await sql.find('grade', {}, { sort: { id: 1 } });

    console.log(`✅ Found ${grades.length} grades in database`);
    
    // Log the first record to see the actual column structure for debugging
    if (grades.length > 0) {
      console.log('Sample grade record columns:', Object.keys(grades[0]));
      console.log('Sample grade data:', grades[0]);
    }

    return res.status(200).json({
      success: true,
      message: `Successfully fetched ${grades.length} grades`,
      data: grades,
      count: grades.length
    });

  } catch (error) {
    console.error('❌ Error fetching grades:', error);
    return res.status(500).json({
      success: false,
      message: `Failed to fetch grades: ${error.message}`,
      error: error.code || 'UNKNOWN_ERROR'
    });
  }
});

// Test all tables route
app.get('/api/test-tables', async (req, res) => {
  try {
    console.log('Testing all collections...');
    
    const collections = ['admin', 'teacher', 'student', 'staff'];
    const results = {};

    for (const collection of collections) {
      try {
        const result = await sql.count(collection);
        results[collection] = {
          status: 'success',
          count: result[0].count
        };
        console.log(`${collection} collection: ${result[0].count} records`);
      } catch (error) {
        results[collection] = {
          status: 'error',
          error: error.message
        };
        console.log(`${collection} collection error:`, error.message);
      }
    }

    res.json({
      success: true,
      message: 'Collection test completed',
      results
    });
  } catch (error) {
    console.error('Table test error:', error);
    res.status(500).json({
      success: false,
      message: 'Collection test failed',
      error: error.message
    });
  }
});

// Test specific user route
app.get('/api/test-user', async (req, res) => {
  try {
    const { email, role } = req.query;
    
    if (!email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Email and role parameters are required'
      });
    }

    console.log(`Testing user lookup: ${email} in ${role} collection`);

    const users = await sql.find(role, { email: email });

    res.json({
      success: true,
      message: `User lookup completed for ${email} in ${role} collection`,
      found: users.length,
      users: users
    });
  } catch (error) {
    console.error('User test error:', error);
    res.status(500).json({
      success: false,
      message: 'User test failed',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
});

// Function to get local IP address
function getLocalIP() {
  const interfaces = require('os').networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (interface.family === 'IPv4' && !interface.internal) {
        return interface.address;
      }
    }
  }
  return 'localhost';
}

// Start server - bind to all network interfaces (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
  const localIP = getLocalIP();
  
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Access URLs:`);
  console.log(`   🏠 Localhost: http://localhost:${PORT}`);
  console.log(`   🌐 Network:   http://${localIP}:${PORT}`);
  console.log('');
  console.log(`🔗 API Endpoints:`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Health check: http://${localIP}:${PORT}/api/health`);
  console.log(`   Test database: http://localhost:${PORT}/test-db`);
  console.log(`   Test database: http://${localIP}:${PORT}/test-db`);
  console.log(`   Test tables: http://localhost:${PORT}/api/test-tables`);
  console.log(`   Test tables: http://${localIP}:${PORT}/api/test-tables`);
  console.log('');
  console.log(`📱 Admin Dashboard:`);
  console.log(`   Localhost: http://localhost:3000/dashboard/admin`);
  console.log(`   Network:   http://${localIP}:3000/dashboard/admin`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
});

module.exports = app;