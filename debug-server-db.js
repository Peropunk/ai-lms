// Debug script to check server database configuration
require('dotenv').config();
const sql = require('./db.js');

async function debugServerDB() {
  try {
    console.log('=== SERVER DATABASE CONFIGURATION DEBUG ===');
    console.log('Environment variables:');
    console.log('  MONGODB_URI:', process.env.MONGODB_URI || 'undefined (using default)');
    console.log('  DB_NAME:', process.env.DB_NAME || 'undefined (using default)');
    console.log('  NODE_ENV:', process.env.NODE_ENV || 'undefined');
    
    console.log('\n=== TESTING SERVER DATABASE CONNECTION ===');
    
    // Test connection
    const connectionTest = await sql`SELECT 1 as connection_test`;
    console.log('✅ Connection test result:', connectionTest);
    
    // Test admin collection
    console.log('\n=== TESTING ADMIN COLLECTION ===');
    const adminUsers = await sql`SELECT * FROM ${'admin'}`;
    console.log(`Found ${adminUsers.length} users in admin collection:`);
    adminUsers.forEach(user => {
      console.log(`  - ${user.email} (${user.name})`);
    });
    
    // Test specific user query
    console.log('\n=== TESTING SPECIFIC USER QUERY ===');
    const specificUser = await sql`SELECT * FROM ${'admin'} WHERE email = ${'parve123@gmail.com'}`;
    console.log(`Query result for parve123@gmail.com:`, specificUser);
    
    if (specificUser.length > 0) {
      console.log('✅ User found via server database connection!');
    } else {
      console.log('❌ User NOT found via server database connection!');
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

debugServerDB();