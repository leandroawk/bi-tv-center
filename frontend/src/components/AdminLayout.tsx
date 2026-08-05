import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

const DRAWER_WIDTH = 260;

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const menuItems = [
    { text: 'Visão Geral', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Gerenciar TVs', icon: <MonitorIcon />, path: '/admin/screens' },
    { text: 'Dashboards (PBI)', icon: <WebAssetIcon />, path: '/admin/dashboards' },
    { text: 'Playlists', icon: <QueueMusicIcon />, path: '/admin/playlists' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderRight: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            BI TV Center
          </Typography>
          <Typography variant="caption" color="text.secondary">
            NOC Management
          </Typography>
        </Box>
        <List sx={{ mt: 2, px: 2 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  component={Link} 
                  to={item.path}
                  sx={{ 
                    borderRadius: 2,
                    backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                      color: '#fff',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 600 : 400 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {children}
      </Box>
    </Box>
  );
};
