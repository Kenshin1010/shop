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
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
  const [identifier, setIdentifier] = useState(''); // Username or email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isRegistering = location.pathname === '/register'; // Check if the path is for registration

  useEffect(() => {
    localStorage.removeItem('authToken');
    const messages = getFlashMessages(); // Implement this function as needed
    if (messages.length > 0) {
      setAlertMessage(messages[0]);
    }
  }, []);

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isRegistering) {
      // Check if username or email exists
      const exists = await checkIfUserExists(identifier); // Implement this function
      if (exists) {
        setAlertMessage('Username or email already exists.');
        return;
      }

      if (password !== confirmPassword) {
        setAlertMessage('Passwords do not match.');
        return;
      }

      // Save identifier and password in localStorage
      localStorage.setItem(identifier, password); // Save password with identifier as key
      setAlertMessage('Registration successful! You can now log in.');
      // Optionally redirect to login page
      navigate('/login');
    } else {
      // Mock login logic
      const storedPassword = localStorage.getItem(identifier);
      if (storedPassword && storedPassword === password) {
        login();
        localStorage.setItem('authToken', 'yourAuthToken'); // Save token
        navigate('/dashboard');
      } else {
        setAlertMessage('Login failed. Please check your credentials.');
        navigate('/login-fail');
      }
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
        {isRegistering ? (
          'Register'
        ) : (
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Shop Manager
          </Link>
        )}
      </Typography>
      {alertMessage && (
        <Alert severity="error" sx={{ width: '100%', marginBottom: 2 }}>
          {alertMessage}
        </Alert>
      )}
      <form onSubmit={handleAuth} style={{ width: '100%' }}>
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
        {isRegistering && (
          <TextField
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
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
          {isRegistering ? 'Register' : 'Sign in'}
        </Button>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 2,
          }}
        >
          <Typography variant="body2">
            {!isRegistering ? 'New shop?' : 'Already have an account?'}
          </Typography>
          <Button
            onClick={() => navigate(isRegistering ? '/login' : '/register')}
          >
            {!isRegistering ? 'Register' : 'Sign in'}
          </Button>
        </Box>
        <Divider sx={{ marginY: 2 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant="body2" sx={{ color: '#0094FF' }}>
            Privacy Notice
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#0094FF', textAlign: 'right' }}
          >
            Conditions of Use
          </Typography>
        </Box>
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

// Mock function to check if username or email already exists
const checkIfUserExists = async (identifier: string): Promise<boolean> => {
  // Replace this with actual API call or database query
  return localStorage.getItem(identifier) !== null; // Return true if the identifier already exists
};

// Placeholder function for getting flash messages
const getFlashMessages = (): string[] => {
  return [];
};

export default Auth;
