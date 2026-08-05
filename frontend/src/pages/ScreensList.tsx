import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const ScreensList = () => {
  const [screens] = useState([
    { id: 1, name: 'TV Diretoria', location: 'Sala 1', status: 'Online', playlist: 'Executiva' },
    { id: 2, name: 'TV Recepção', location: 'Hall', status: 'Offline', playlist: 'Institucional' },
  ]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">Gerenciar TVs (Screens)</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Nova TV</Button>
      </Box>

      <TableContainer component={Paper} className="glass-panel" elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome da TV</TableCell>
              <TableCell>Localização</TableCell>
              <TableCell>Playlist Atual</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {screens.map((tv) => (
              <TableRow key={tv.id}>
                <TableCell fontWeight="bold">{tv.name}</TableCell>
                <TableCell>{tv.location}</TableCell>
                <TableCell>{tv.playlist}</TableCell>
                <TableCell>
                  <Chip 
                    label={tv.status} 
                    color={tv.status === 'Online' ? 'success' : 'error'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" startIcon={<PlayArrowIcon />}>
                    Abrir Modo TV
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
