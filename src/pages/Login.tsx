import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Divider,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState(''); // Username or email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('authToken');
    const messages = getFlashMessages(); // Implement this function as needed
    if (messages.length > 0) {
      setAlertMessage(messages[0]);
    }
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Mock login logic (Replace with your actual logic)
    const isAuthenticated = await mockLogin(identifier, password);

    if (isAuthenticated) {
      login(); // Call the login function from useAuth
      localStorage.setItem('authToken', 'yourAuthToken'); // Save token
      navigate('/dashboard'); // Redirect to Dashboard
    } else {
      setAlertMessage('Login failed. Please check your credentials.');
      navigate('/login-fail'); // Redirect to login fail page
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgba(217, 217, 217, 0.30)',
        padding: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Shop Manager
      </Typography>
      {alertMessage && (
        <Alert severity="error" sx={{ width: '100%', marginBottom: 2 }}>
          {alertMessage}
        </Alert>
      )}
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        <TextField
          label="Email or username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
          }
          label="Show password"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '100%', marginTop: 2, backgroundColor: '#FAD712' }}
        >
          Sign in
        </Button>
        <Button variant="outlined" sx={{ width: '100%', marginTop: 2 }}>
          Register
        </Button>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          New shop?
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2" sx={{ color: '#0094FF' }}>
          Privacy Notice
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#0094FF', textAlign: 'right' }}
        >
          Conditions of Use
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', color: '#D9D9D9', marginTop: 2 }}
        >
          @2024 GB Global Trade Limited
        </Typography>
      </form>
    </Container>
  );
};

// Mock login function to simulate login logic
const mockLogin = async (
  identifier: string,
  password: string
): Promise<boolean> => {
  // Check if identifier is an email or username
  if (identifier === 'test@example.com' && password === '1234') {
    return true; // Successful login with email
  } else if (identifier === 'test' && password === '1234') {
    return true; // Successful login with username
  }
  return false; // Login failed
};

// Placeholder function for getting flash messages
const getFlashMessages = (): string[] => {
  return [];
};

export default Login;
