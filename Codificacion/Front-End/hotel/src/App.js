import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';     

// Importar componentes principales
import Dashboard from './components/views/Dashboard/Dashboard';

// Importar vistas
import HomePage from './components/views/homePage/HomePage';
import UsuariosRegister from './components/views/userRegister/userRegister';
import HotelRegister from './components/views/hotelRegiter/hotelRegister';
import RoomRegister from './components/views/roomRegister/roomRegister';
import Login from './components/views/login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <HomePage>
            <HomePage /> {}
          </HomePage>
        } />
        <Route path="/login" element={
          <Login>
            <UsuariosRegister />
          </Login>
        } />
        <Route path="/usuarios" element={
          <Dashboard>
            <UsuariosRegister />
          </Dashboard>
        } />
        <Route path="/hotel" element={
          <Dashboard>
            <HotelRegister />
          </Dashboard>
        } />
        <Route path="/habitacion" element={
          <Dashboard>
            <RoomRegister />
          </Dashboard>
        } />
        {/* <Route path="/ayuda" element={
          <Dashboard>
            <HelpContent />
          </Dashboard>
        } /> */}
      </Routes>
    </Router>
  );
}

export default App;