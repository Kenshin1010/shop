import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme as useMUITheme,
} from '@mui/material';
import { useTheme } from '../hooks/useTheme';
import useAuth from '../hooks/useAuth';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const muiTheme = useMUITheme(); // Get MUI theme
  const { isAuthenticated, logout } = useAuth(); // Get auth state

  const handleLogout = () => {
    logout(); // Call the logout function to clear authentication
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor:
          theme === 'light'
            ? muiTheme.palette.primary.main
            : muiTheme.palette.grey[900],
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Shop Manager
        </Typography>
        {!isAuthenticated ? (
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        ) : (
          <>
            <Button component={Link} to="/dashboard" color="inherit">
              Dashboard
            </Button>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </>
        )}
        <Button onClick={toggleTheme} color="inherit">
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
