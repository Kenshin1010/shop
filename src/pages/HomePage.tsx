import React, { useEffect } from 'react';
import { Container, Typography, Button, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import MainLayout from '../layouts/MainLayout';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      login(); // Sets isAuthenticated to true
    }
  }, [login]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleDashboard = () => {
    if (!isAuthenticated) {
      setOpenSnackbar(true); // Open the snackbar if not authenticated
    } else {
      navigate('/dashboard');
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <MainLayout>
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
            <>
              <Button
                variant="contained"
                onClick={handleDashboard}
                sx={{ backgroundColor: '#FAD712', color: 'black' }}
              >
                Go to Dashboard
              </Button>
            </>
          )}
        </Box>
        <Button variant="outlined" onClick={toggleTheme} sx={{ marginTop: 2 }}>
          Toggle Theme
        </Button>

        {/* Snackbar for unauthenticated access */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="You need to log in to access the Dashboard."
        />
      </Container>
    </MainLayout>
  );
};

export default HomePage;
