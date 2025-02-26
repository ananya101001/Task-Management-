import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// Define the type for the styles object
type Styles = {
  container: React.CSSProperties;
  input: React.CSSProperties;
  button: React.CSSProperties;
  registerText: React.CSSProperties;
  registerLink: React.CSSProperties;
};

// Define the styles object with explicit types
const styles: Styles = {
  container: {
    display: 'flex',
    flexDirection: 'column', // Explicitly set to a valid value
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '200px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    margin: '10px 0',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  registerText: {
    marginTop: '20px',
  },
  registerLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/auth/login', { username, password }, {
        withCredentials: true, // Include cookies and credentials
      });
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Login failed';
        alert(message); // Display the specific error message from the backend
      } else {
        alert('Login failed'); // Fallback for non-Axios errors
      }
      console.error('Login failed', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
      <p style={styles.registerText}>
        New user? <Link to="/register" style={styles.registerLink}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;