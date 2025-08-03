const fetch = require('node-fetch');

async function testAuthentication() {
  console.log('=== TESTING AUTHENTICATION FLOW ===');
  
  const baseUrl = 'http://localhost:3001';
  
  try {
    // Test 1: Health check
    console.log('1. Testing server health...');
    const healthResponse = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Server health:', healthData.status);
    
    // Test 2: Database connection
    console.log('\n2. Testing database connection...');
    const dbResponse = await fetch(`${baseUrl}/test-db`);
    const dbData = await dbResponse.json();
    console.log('✅ Database:', dbData.success ? 'Connected' : 'Failed');
    
    // Test 3: Table data
    console.log('\n3. Testing table data...');
    const tablesResponse = await fetch(`${baseUrl}/api/test-tables`);
    const tablesData = await tablesResponse.json();
    console.log('✅ Tables status:');
    Object.entries(tablesData.results).forEach(([table, result]) => {
      console.log(`   ${table}: ${result.count} records`);
    });
    
    // Test 4: Specific user lookup
    console.log('\n4. Testing user lookup...');
    const userResponse = await fetch(`${baseUrl}/api/test-user?email=alan12@gmail.com&role=student`);
    const userData = await userResponse.json();
    console.log(`✅ User lookup: ${userData.found} users found`);
    if (userData.users && userData.users.length > 0) {
      console.log('   User data:', {
        _id: userData.users[0]._id,
        email: userData.users[0].email,
        password: userData.users[0].password,
        name: userData.users[0].name
      });
    }
    
    // Test 5: Authentication
    console.log('\n5. Testing authentication...');
    const loginData = {
      email: 'alan12@gmail.com',
      password: '12345678',
      role: 'student'
    };
    
    const authResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });
    
    const authResult = await authResponse.json();
    
    if (authResult.success) {
      console.log('✅ Authentication SUCCESSFUL!');
      console.log('   Message:', authResult.message);
      console.log('   User:', {
        id: authResult.user.id,
        email: authResult.user.email,
        name: authResult.user.name,
        role: authResult.user.role
      });
      console.log('   Token generated:', authResult.token ? 'Yes' : 'No');
    } else {
      console.log('❌ Authentication FAILED');
      console.log('   Error:', authResult.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  
  console.log('\n=== TEST COMPLETE ===');
}

// Run the test
testAuthentication();