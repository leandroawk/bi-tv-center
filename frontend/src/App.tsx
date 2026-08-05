import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { DashboardAdmin } from './pages/DashboardAdmin';
import { ScreensList } from './pages/ScreensList';

const Login = () => <div style={{display:'flex', height:'100vh', justifyContent:'center', alignItems:'center'}}><h1>BI TV Login</h1></div>;
const TVMode = () => <div style={{width:'100vw', height:'100vh', background:'#000', color:'#fff', display:'flex', justifyContent:'center', alignItems:'center'}}><h1>TV MODE (Full Screen)</h1></div>;
const DashboardsMock = () => <h2>Gerenciamento de Dashboards (Power BI URLs)</h2>;
const PlaylistsMock = () => <h2>Gerenciamento de Playlists (Sequências)</h2>;

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tv/:tvId" element={<TVMode />} />
      
      <Route path="/admin" element={<AdminLayout><DashboardAdmin /></AdminLayout>} />
      <Route path="/admin/screens" element={<AdminLayout><ScreensList /></AdminLayout>} />
      <Route path="/admin/dashboards" element={<AdminLayout><DashboardsMock /></AdminLayout>} />
      <Route path="/admin/playlists" element={<AdminLayout><PlaylistsMock /></AdminLayout>} />
      
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default App;
