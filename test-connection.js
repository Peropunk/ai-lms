const postgres = require('postgres');
require('dotenv').config();

console.log('=== DATABASE CONNECTION TEST ===');

// Database connection configuration
const sql = postgres({
  host: process.env.DB_HOST || 'db.hlbequeurrlplcacogss.supabase.co',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'p@rv80057',
  ssl: { rejectUnauthorized: false },
  max: 20,
  idle_timeout: 20,
  connect_timeout: 60,
});

async function testDatabase() {
  try {
    console.log('1. Testing basic connection...');
    const result = await sql`SELECT NOW() as current_time, 'Connection successful!' as message`;
    console.log('✅ Database connected successfully!');
    console.log('   Time:', result[0].current_time);
    console.log('   Message:', result[0].message);

    console.log('\n2. Testing table access...');
    const tables = ['admin', 'teacher', 'student', 'staff'];
    
    for (const table of tables) {
      try {
        console.log(`\n   Testing ${table} table:`);
        
        // Get count
        const countResult = await sql`SELECT COUNT(*) as count FROM ${sql(table)}`;
        const count = parseInt(countResult[0].count);
        console.log(`   ✅ ${table} table: ${count} records found`);
        
        // Get sample data if exists
        if (count > 0) {
          const sampleData = await sql`SELECT * FROM ${sql(table)} LIMIT 3`;
          console.log(`   📋 Sample data from ${table}:`);
          sampleData.forEach((record, index) => {
            console.log(`      Record ${index + 1}:`, {
              _id: record._id,
              email: record.email,
              password: record.password,
              name: record.name || 'N/A'
            });
          });
        }
        
      } catch (tableError) {
        console.log(`   ❌ Error accessing ${table} table:`, tableError.message);
      }
    }

    console.log('\n3. Testing specific user lookup...');
    try {
      const studentData = await sql`SELECT * FROM student WHERE email = 'alan12@gmail.com'`;
      if (studentData.length > 0) {
        console.log('   ✅ Found alan12@gmail.com in student table:');
        console.log('      Data:', {
          _id: studentData[0]._id,
          email: studentData[0].email,
          password: studentData[0].password,
          name: studentData[0].name
        });
      } else {
        console.log('   ⚠️  alan12@gmail.com not found in student table');
      }
    } catch (userError) {
      console.log('   ❌ Error looking up specific user:', userError.message);
    }

    console.log('\n4. Testing authentication simulation...');
    try {
      const authTest = await sql`
        SELECT _id, email, password, name 
        FROM student 
        WHERE email = 'alan12@gmail.com' AND password = '12345678'
      `;
      
      if (authTest.length > 0) {
        console.log('   ✅ Authentication test PASSED for alan12@gmail.com with password 12345678');
        console.log('      User data:', authTest[0]);
      } else {
        console.log('   ❌ Authentication test FAILED - no matching user found');
        
        // Try to find user with any password
        const userExists = await sql`SELECT * FROM student WHERE email = 'alan12@gmail.com'`;
        if (userExists.length > 0) {
          console.log('   📋 User exists but password mismatch:');
          console.log('      Stored password:', userExists[0].password);
          console.log('      Tested password: 12345678');
        }
      }
    } catch (authError) {
      console.log('   ❌ Authentication test error:', authError.message);
    }

    await sql.end();
    console.log('\n=== TEST COMPLETE ===');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.error('Error details:', {
      code: error.code,
      detail: error.detail,
      hint: error.hint
    });
  }
}

testDatabase();