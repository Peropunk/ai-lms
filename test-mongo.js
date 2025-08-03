const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'AILMS';

async function testMongoDB() {
  let client;
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('URI:', MONGODB_URI);
    console.log('Database:', DB_NAME);
    
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB successfully!');
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📚 Available collections:');
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });
    
    // Test each collection
    const testCollections = ['admin', 'teacher', 'student', 'staff', 'grade'];
    
    for (const collectionName of testCollections) {
      console.log(`\n🔍 Testing collection: ${collectionName}`);
      
      try {
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        console.log(`  📊 Document count: ${count}`);
        
        if (count > 0) {
          const sample = await collection.findOne();
          console.log(`  📄 Sample document:`, JSON.stringify(sample, null, 2));
        }
        
        // Test specific email query
        if (collectionName === 'admin') {
          console.log(`  🔎 Testing email query for: parve123@gmail.com`);
          const user = await collection.findOne({ email: 'parve123@gmail.com' });
          if (user) {
            console.log(`  ✅ Found user:`, JSON.stringify(user, null, 2));
          } else {
            console.log(`  ❌ No user found with email: parve123@gmail.com`);
          }
        }
        
      } catch (error) {
        console.log(`  ❌ Error testing ${collectionName}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ MongoDB test failed:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 MongoDB connection closed');
    }
  }
}

testMongoDB(); 