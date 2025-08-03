const http = require('http');

async function testLogin() {
  try {
    console.log('🧪 Testing login functionality...');
    
    const loginData = {
      email: 'parve123@gmail.com',
      password: '12345678',
      role: 'admin'
    };
    
    console.log('📤 Sending login request:', loginData);
    
    const postData = JSON.stringify(loginData);
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      console.log('📥 Response status:', res.statusCode);
      console.log('📥 Response headers:', res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log('📥 Response body:', JSON.stringify(result, null, 2));
          
          if (result.success) {
            console.log('✅ Login successful!');
            console.log('🔑 Token received:', result.token ? 'Yes' : 'No');
            console.log('👤 User data:', result.user);
          } else {
            console.log('❌ Login failed:', result.message);
          }
        } catch (parseError) {
          console.log('❌ Failed to parse response:', parseError.message);
          console.log('Raw response:', data);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message);
    });
    
    req.write(postData);
    req.end();
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testLogin(); 