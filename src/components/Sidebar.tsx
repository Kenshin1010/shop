import React from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemButton,
} from '@mui/material';
import { useTheme } from '../hooks/useTheme';

const Sidebar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          backgroundColor: theme === 'light' ? '#f4f4f4' : '#333',
          color: theme === 'light' ? '#000' : '#fff',
        },
      }}
    >
      <List>
        <ListItem component={Link} to="/login" disablePadding>
          <ListItemButton>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/dashboard" disablePadding>
          <ListItemButton>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
