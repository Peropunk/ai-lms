const postgres = require('postgres');
require('dotenv').config();

console.log('=== CHECKING USER DATA IN DATABASE ===');

const sql = postgres({
  host: process.env.DB_HOST || 'db.hlbequeurrlplcacogss.supabase.co',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'p@rv80057',
  ssl: { rejectUnauthorized: false },
});

async function checkUserData() {
  try {
    console.log('1. Checking all students in database...');
    const allStudents = await sql`SELECT * FROM student`;
    console.log(`Found ${allStudents.length} students total:`);
    
    if (allStudents.length === 0) {
      console.log('❌ No students found in database!');
      console.log('You need to add student data to your database.');
    } else {
      allStudents.forEach((student, index) => {
        console.log(`Student ${index + 1}:`, {
          _id: student._id,
          email: student.email,
          password: student.password,
          name: student.name || 'No name',
          passwordType: typeof student.password
        });
      });
    }

    console.log('\n2. Specifically looking for alan12@gmail.com...');
    const specificUser = await sql`SELECT * FROM student WHERE email = 'alan12@gmail.com'`;
    
    if (specificUser.length > 0) {
      console.log('✅ Found alan12@gmail.com:');
      console.log('User data:', specificUser[0]);
    } else {
      console.log('❌ alan12@gmail.com NOT FOUND in student table');
    }

    console.log('\n3. Testing password comparison...');
    const testPasswords = ['12345678', 12345678, '123456', 123456];
    
    for (const testPass of testPasswords) {
      const result = await sql`
        SELECT * FROM student 
        WHERE email = 'alan12@gmail.com' AND password = ${testPass}
      `;
      console.log(`Password ${testPass} (${typeof testPass}): ${result.length > 0 ? '✅ MATCH' : '❌ No match'}`);
    }

    console.log('\n4. Checking all tables for any user with this email...');
    const tables = ['admin', 'teacher', 'student', 'staff'];
    
    for (const table of tables) {
      try {
        const users = await sql`SELECT * FROM ${sql(table)} WHERE email = 'alan12@gmail.com'`;
        if (users.length > 0) {
          console.log(`✅ Found in ${table} table:`, {
            _id: users[0]._id,
            email: users[0].email,
            password: users[0].password,
            name: users[0].name
          });
        } else {
          console.log(`❌ Not found in ${table} table`);
        }
      } catch (error) {
        console.log(`❌ Error checking ${table} table:`, error.message);
      }
    }

    await sql.end();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkUserData();