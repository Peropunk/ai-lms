const { MongoClient } = require('mongodb');

async function testDirectQuery() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('AILMS');
    const adminCollection = db.collection('admin');
    
    // Test the exact query that our SQL parser should generate
    const query = { email: 'parve123@gmail.com' };
    console.log('Testing query:', query);
    
    const users = await adminCollection.find(query).toArray();
    
    console.log(`Found ${users.length} users with query:`, query);
    
    if (users.length > 0) {
      console.log('User data:', JSON.stringify(users[0], null, 2));
    }
    
    // Also test with projection
    const usersWithProjection = await adminCollection.find(
      query, 
      { projection: { _id: 1, email: 1, password: 1, name: 1 } }
    ).toArray();
    
    console.log(`Found ${usersWithProjection.length} users with projection`);
    
    if (usersWithProjection.length > 0) {
      console.log('User data with projection:', JSON.stringify(usersWithProjection[0], null, 2));
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

testDirectQuery(); 