import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom'; // Añadido este import

function HomePage() {
  // Array con datos de los hoteles con tipos de habitaciones
  const navigate = useNavigate();
  
  // Función para manejar la redirección al login
  const handleLoginClick = () => {
    navigate('/login');
  };
  const hotels = [
    {
      id: 1,
      name: 'Azura Sky Resort',
      rooms: {
        estandar: 5,
        junior: 10,
        suite: 7
      },
      rating: 4.8,
      location: 'Centro Histórico',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      name: 'Velvet Oasis Grand',
      rooms: {
        estandar: 8,
        junior: 8,
        suite: 4
      },
      rating: 4.7,
      location: 'Zona Exclusiva',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      name: 'Lumina Bay Suites',
      rooms: {
        estandar: 2,
        junior: 3,
        suite: 9
      },
      rating: 4.9,
      location: 'Frente al Mar',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-logo">
          <div className="star-icon">★</div>
          <h1>Hoteles de Lujo</h1>
        </div>
        <button className="login-button" onClick={handleLoginClick}>
          Inicio de sesión
        </button>
      </header>

      <div className="hotels-grid-container">
        <div className="hotels-grid">
          {hotels.map(hotel => (
            <div key={hotel.id} className="hotel-card">
              <div className="hotel-banner" style={{ backgroundImage: `url(${hotel.image})` }}>
                <div className="hotel-banner-overlay">
                  <h2 className="hotel-name">{hotel.name}</h2>
                </div>
              </div>
              
              <div className="hotel-content">
                <div className="hotel-rating">
                  <span className="star-icon">★</span>
                  <span className="rating-value">{hotel.rating}</span>
                  <span className="divider">•</span>
                  <span className="location-icon">📍</span>
                  <span className="location-value">{hotel.location}</span>
                </div>
                
                <div className="hotel-rooms-container">
                  <div className="room-types-title">
                    <span className="users-icon">👥</span>
                    <span className="room-title">Tipos de habitaciones:</span>
                  </div>
                  <div className="room-types">
                    <div className="room-type">
                      <span className="room-type-count">{hotel.rooms.estandar}</span>
                      <span className="room-type-name">Estándar</span>
                    </div>
                    <div className="room-type">
                      <span className="room-type-count">{hotel.rooms.junior}</span>
                      <span className="room-type-name">Junior</span>
                    </div>
                    <div className="room-type">
                      <span className="room-type-count">{hotel.rooms.suite}</span>
                      <span className="room-type-name">Suite</span>
                    </div>
                  </div>
                </div>
                
                <button className="availability-button">
                  Ver disponibilidad
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="home-footer">
        © 2025 Hoteles de Lujo | Experiencias Inolvidables
      </footer>
    </div>
  );
}

export default HomePage;