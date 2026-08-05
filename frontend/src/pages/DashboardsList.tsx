import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

export const DashboardsList = () => {
  const [dashboards] = useState([
    { id: 1, name: 'Vendas Q3', category: 'Comercial', refreshRate: '5 min', status: 'Ativo' },
    { id: 2, name: 'Produção Diária', category: 'Operação', refreshRate: '30 min', status: 'Ativo' },
    { id: 3, name: 'RH Turnover', category: 'Recursos Humanos', refreshRate: 'Desabilitado', status: 'Inativo' },
  ]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">Dashboards Power BI</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Novo Dashboard</Button>
      </Box>

      <TableContainer component={Paper} className="glass-panel" elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Auto-Refresh</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashboards.map((dash) => (
              <TableRow key={dash.id}>
                <TableCell fontWeight="bold">{dash.name}</TableCell>
                <TableCell>{dash.category}</TableCell>
                <TableCell>{dash.refreshRate}</TableCell>
                <TableCell>
                  <Chip 
                    label={dash.status} 
                    color={dash.status === 'Ativo' ? 'success' : 'default'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" startIcon={<EditIcon />}>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
