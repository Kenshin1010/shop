import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import AuthLayout from '../layouts/AuthLayout';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogin = () => {
    // Logic to perform login
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: theme === 'light' ? 'white' : 'rgba(50, 50, 50, 0.8)',
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Shop Manager
        </Typography>
        <Typography variant="h6" gutterBottom>
          Manage your sales and inventory effortlessly.
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          {!isAuthenticated ? (
            <Button
              variant="contained"
              onClick={handleLogin}
              sx={{ backgroundColor: '#FAD712', color: 'black' }}
            >
              Sign In
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleDashboard}
              sx={{ backgroundColor: '#FAD712', color: 'black' }}
            >
              Go to Dashboard
            </Button>
          )}
        </Box>
        <Button variant="outlined" onClick={toggleTheme} sx={{ marginTop: 2 }}>
          Toggle Theme
        </Button>
      </Container>
    </AuthLayout>
  );
};

export default HomePage;
