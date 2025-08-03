const sql = require('./db.js');

async function debugQuery() {
  try {
    console.log('Testing login query...');
    
    const role = 'admin';
    const email = 'parve123@gmail.com';
    
    const queryString = `
        SELECT _id, email, password, name 
        FROM ${role} 
        WHERE email = ${email}
      `;
    
    console.log('Query string:', queryString);
    
    const users = await sql`
        SELECT _id, email, password, name 
        FROM ${role} 
        WHERE email = ${email}
      `;
    
    console.log('Result:', users);
    console.log('Found users:', users.length);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

debugQuery(); 