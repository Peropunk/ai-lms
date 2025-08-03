const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ailms-backend.querysure.com';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      console.log('Making request to:', url);
      console.log('Request config:', config);
      
      const response = await fetch(url, config);
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Server returned non-JSON response: ${text}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server. Please check if the server is running.');
      }
      
      // Handle JSON parsing errors
      if (error.name === 'SyntaxError') {
        throw new Error('Server returned invalid JSON response');
      }
      
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password, role) {
    try {
      // First check if server is running
      try {
        const healthCheck = await fetch(`${this.baseURL}/api/health`, { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!healthCheck.ok) {
          console.error('Server health check failed');
          // Return a user-friendly error instead of throwing
          return {
            success: false,
            message: 'Authentication server is unavailable. Please try again later.'
          };
        }
      } catch (healthError) {
        console.error('Server health check failed:', healthError);
        // Return a user-friendly error instead of throwing
        return {
          success: false,
          message: 'Cannot connect to authentication server. Please ensure the server is running.'
        };
      }
      
      // Proceed with login if server is running
      try {
        const response = await this.request('/api/auth/login', {
          method: 'POST',
          body: { email, password, role },
        });
        
        // The server returns { success: true, user: {...}, token: "..." }
        if (response.success) {
          return {
            success: true,
            user: response.user,
            token: response.token,
            message: response.message
          };
        } else {
          // This shouldn't happen as the server should return an error status
          return {
            success: false,
            message: response.message || 'Login failed'
          };
        }
      } catch (requestError) {
        console.error('Login request error:', requestError);
        
        // Handle 401 Unauthorized (invalid credentials)
        if (requestError.message && requestError.message.includes('401')) {
          return {
            success: false,
            message: 'Invalid credentials. Please check your email, password, and selected role.'
          };
        }
        
        // Handle other errors
        return {
          success: false,
          message: 'Authentication failed. Please try again.'
        };
      }
    } catch (error) {
      console.error('Unexpected login error:', error);
      // Catch-all for any unexpected errors
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      };
    }
  }

  async signup(email, password, userData = {}) {
    return this.request('/api/auth/signup', {
      method: 'POST',
      body: { email, password, userData },
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/api/auth/user');
  }

  // Users endpoints
  async getUsers() {
    return this.request('/api/users');
  }

  async getUserById(id) {
    return this.request(`/api/users/${id}`);
  }

  async createUser(userData) {
    return this.request('/api/users', {
      method: 'POST',
      body: userData,
    });
  }

  async updateUser(id, userData) {
    return this.request(`/api/users/${id}`, {
      method: 'PUT',
      body: userData,
    });
  }

  async deleteUser(id) {
    return this.request(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  async testDatabase() {
    return this.request('/test-db');
  }
}

export const apiClient = new ApiClient();
export default apiClient;