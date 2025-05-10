import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/views/homePage/HomePage.jsx';
import Login from './components/views/login/Login.jsx';

function App() {
  // Crear un router con configuración de rutas
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  // Devuelve RouterProvider directamente, sin envolverlo en un div
  return <RouterProvider router={router} />;
}

export default App;