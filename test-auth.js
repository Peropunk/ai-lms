const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testAuth() {
  console.log('=== TESTING AUTHENTICATION ===');
  
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'alan12@gmail.com',
        password: '12345678',
        role: 'student'
      })
    });
    
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', data);
    
    if (data.success) {
      console.log('✅ Authentication successful!');
      console.log('User:', data.user);
      console.log('Token:', data.token.substring(0, 20) + '...');
    } else {
      console.log('❌ Authentication failed');
      console.log('Error:', data.message);
    }
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testAuth();