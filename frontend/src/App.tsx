import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { DashboardAdmin } from './pages/DashboardAdmin';
import { ScreensList } from './pages/ScreensList';

import { DashboardsList } from './pages/DashboardsList';
import { PlaylistsList } from './pages/PlaylistsList';

const Login = () => <div style={{display:'flex', height:'100vh', justifyContent:'center', alignItems:'center'}}><h1>BI TV Login</h1></div>;
const TVMode = () => <div style={{width:'100vw', height:'100vh', background:'#000', color:'#fff', display:'flex', justifyContent:'center', alignItems:'center'}}><h1>TV MODE (Full Screen)</h1></div>;

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tv/:tvId" element={<TVMode />} />
      
      <Route path="/admin" element={<AdminLayout><DashboardAdmin /></AdminLayout>} />
      <Route path="/admin/screens" element={<AdminLayout><ScreensList /></AdminLayout>} />
      <Route path="/admin/dashboards" element={<AdminLayout><DashboardsList /></AdminLayout>} />
      <Route path="/admin/playlists" element={<AdminLayout><PlaylistsList /></AdminLayout>} />
      
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default App;
