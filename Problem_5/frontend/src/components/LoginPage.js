import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://np0gqaxmz1.execute-api.us-west-2.amazonaws.com/dev/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setToken(data.data);
        alert('Login success: ' + data.message);
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default LoginPage;
