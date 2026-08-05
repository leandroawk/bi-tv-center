import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import MonitorIcon from '@mui/icons-material/Monitor';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const DashboardAdmin = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Visão Geral do Sistema
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card className="glass-panel" elevation={0}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MonitorIcon color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">TVs Ativas</Typography>
                <Typography variant="h3" fontWeight="bold">4</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card className="glass-panel" elevation={0}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DashboardIcon color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Dashboards Cadastrados</Typography>
                <Typography variant="h3" fontWeight="bold">12</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
