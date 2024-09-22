import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC<{ showError: boolean; onCloseError: () => void }> = ({
  showError,
  onCloseError,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static" color="default">
        <Container maxWidth="lg">
          <Toolbar>
            {/* Icon button for mobile menu */}
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            {/* Brand title */}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Navbar
            </Typography>
            {/* Navigation links */}
            <Button onClick={() => navigate('/')}>Home</Button>
            <Button onClick={() => navigate('/features')}>Features</Button>
            <Button onClick={() => navigate('/pricing')}>Pricing</Button>
            <Button disabled>Disabled</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Snackbar open={showError} autoHideDuration={6000} onClose={onCloseError}>
        <Alert onClose={onCloseError} severity="error" sx={{ width: '100%' }}>
          Login Failed! Please check your credentials.
        </Alert>
      </Snackbar>
    </>
  );
};

const LoginFail: React.FC = () => {
  const [showError, setShowError] = React.useState(true);
  const navigate = useNavigate();

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <>
      <Navbar showError={showError} onCloseError={handleCloseError} />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          Login Failed
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please check your credentials and try again.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{ marginTop: 2 }}
        >
          Go to Login
        </Button>
      </Container>
    </>
  );
};

export default LoginFail;
