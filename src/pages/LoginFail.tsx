import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
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
          <Button label="Home" onClick={() => navigate('/')} />
          <Button label="Features" onClick={() => navigate('/')} />
          <Button label="Pricing" onClick={() => navigate('/')} />
          <Button label="Disabled" onClick={() => navigate('/')} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
