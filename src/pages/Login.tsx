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
import { useNavigate } from 'react-router-dom'; // For routing

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Effect to show alert message if exists
  useEffect(() => {
    // Logic to get flash messages (if any)
    const messages = getFlashMessages(); // This function should be implemented
    if (messages.length > 0) {
      setAlertMessage(messages[0]);
    }
  }, []);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle login, possibly call an API and redirect upon success
    // If login is successful
    navigate('/dashboard'); // Redirect to Dashboard
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
          label="Email or phone number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

// Placeholder function for getting flash messages
const getFlashMessages = (): string[] => {
  // Implement your logic to get flash messages
  return [];
};

export default Login;
