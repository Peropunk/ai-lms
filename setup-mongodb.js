const { MongoClient } = require('mongodb');

// MongoDB configuration
const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'AILMS';

async function setupMongoDB() {
  let client;
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB successfully!');
    
    // Sample data for each collection
    const sampleData = {
      admin: [
        {
          _id: 'admin_001',
          email: 'admin@school.com',
          password: 'admin123',
          name: 'School Administrator',
          role: 'admin',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          _id: 'admin_002',
          email: 'parve123@gmail.com',
          password: '12345678',
          name: 'Parve Admin',
          role: 'admin',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      teacher: [
        {
          _id: 'teacher_001',
          email: 'teacher1@school.com',
          password: 'teacher123',
          name: 'John Smith',
          role: 'teacher',
          subject: 'Mathematics',
          phone: '+1234567890',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          _id: 'teacher_002',
          email: 'teacher2@school.com',
          password: 'teacher456',
          name: 'Sarah Johnson',
          role: 'teacher',
          subject: 'English',
          phone: '+1234567891',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      student: [
        {
          _id: 'student_001',
          email: 'student1@school.com',
          password: 'student123',
          name: 'Alice Brown',
          role: 'student',
          grade: '10th',
          parent_email: 'parent1@email.com',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          _id: 'student_002',
          email: 'alan12@gmail.com',
          password: '12345678',
          name: 'Alan Wilson',
          role: 'student',
          grade: '11th',
          parent_email: 'parent2@email.com',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      staff: [
        {
          _id: 'staff_001',
          email: 'staff1@school.com',
          password: 'staff123',
          name: 'Mike Davis',
          role: 'staff',
          department: 'IT',
          phone: '+1234567892',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      grade: [
        {
          id: 1,
          name: '9th Grade',
          description: 'Ninth Grade',
          created_at: new Date()
        },
        {
          id: 2,
          name: '10th Grade',
          description: 'Tenth Grade',
          created_at: new Date()
        },
        {
          id: 3,
          name: '11th Grade',
          description: 'Eleventh Grade',
          created_at: new Date()
        },
        {
          id: 4,
          name: '12th Grade',
          description: 'Twelfth Grade',
          created_at: new Date()
        }
      ]
    };
    
    // Create collections and insert sample data
    for (const [collectionName, data] of Object.entries(sampleData)) {
      console.log(`\n📚 Setting up ${collectionName} collection...`);
      
      try {
        const collection = db.collection(collectionName);
        
        // Clear existing data
        await collection.deleteMany({});
        console.log(`  🗑️  Cleared existing ${collectionName} data`);
        
        // Insert sample data
        if (data.length > 0) {
          const result = await collection.insertMany(data);
          console.log(`  ✅ Inserted ${result.insertedCount} documents into ${collectionName}`);
          
          // Show sample data
          const sample = await collection.findOne();
          console.log(`  📄 Sample document:`, {
            _id: sample._id || sample.id,
            email: sample.email,
            name: sample.name,
            role: sample.role
          });
        }
        
      } catch (error) {
        console.log(`  ❌ Error setting up ${collectionName}:`, error.message);
      }
    }
    
    // Test the setup
    console.log('\n🧪 Testing the setup...');
    
    // Test admin login
    const adminCollection = db.collection('admin');
    const adminUser = await adminCollection.findOne({ email: 'parve123@gmail.com' });
    
    if (adminUser) {
      console.log('✅ Admin user found:', {
        email: adminUser.email,
        name: adminUser.name,
        password: adminUser.password
      });
    } else {
      console.log('❌ Admin user not found');
    }
    
    // Test student login
    const studentCollection = db.collection('student');
    const studentUser = await studentCollection.findOne({ email: 'alan12@gmail.com' });
    
    if (studentUser) {
      console.log('✅ Student user found:', {
        email: studentUser.email,
        name: studentUser.name,
        password: studentUser.password
      });
    } else {
      console.log('❌ Student user not found');
    }
    
    console.log('\n🎉 MongoDB setup completed successfully!');
    console.log('\n📋 Available test accounts:');
    console.log('  Admin: parve123@gmail.com / 12345678');
    console.log('  Student: alan12@gmail.com / 12345678');
    console.log('  Teacher: teacher1@school.com / teacher123');
    
  } catch (error) {
    console.error('❌ MongoDB setup failed:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 MongoDB connection closed');
    }
  }
}

setupMongoDB(); 