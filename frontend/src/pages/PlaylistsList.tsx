import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';

export const PlaylistsList = () => {
  const [playlists] = useState([
    { id: 1, name: 'Playlist Executiva', itemsCount: 4, duration: '240s', tvs: 1 },
    { id: 2, name: 'Operação 24x7', itemsCount: 2, duration: '120s', tvs: 3 },
  ]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">Gerenciar Playlists</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Nova Playlist</Button>
      </Box>

      <TableContainer component={Paper} className="glass-panel" elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome da Playlist</TableCell>
              <TableCell>Qtd Dashboards</TableCell>
              <TableCell>Tempo Total (Ciclo)</TableCell>
              <TableCell>TVs Vinculadas</TableCell>
              <TableCell>Configurar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlists.map((pl) => (
              <TableRow key={pl.id}>
                <TableCell fontWeight="bold">{pl.name}</TableCell>
                <TableCell>{pl.itemsCount}</TableCell>
                <TableCell>{pl.duration}</TableCell>
                <TableCell>
                  <Chip label={`${pl.tvs} TVs`} color="primary" size="small" />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" startIcon={<SettingsIcon />}>
                    Montar Rotação
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
