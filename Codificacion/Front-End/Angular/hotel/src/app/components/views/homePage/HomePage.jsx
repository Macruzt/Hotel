import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import http from '../../services/httpInterceptor';

function HomePage() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLoginClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const hotelsResponse = await http.get('http://localhost:9000/api/hotels');

        const hotelRoomsResponse = await http.get('http://localhost:9000/api/hotel-rooms');

        setHotels(hotelsResponse.data);
        setHotelRooms(hotelRoomsResponse.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar los datos de hoteles. Por favor, intente nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRoomCountsByType = (hotelId) => {
    const hotelRoomsFiltered = hotelRooms.filter(hotelRoom => hotelRoom.hotel.id === hotelId);

    const counts = {
      ESTANDAR: 0,
      JUNIOR: 0,
      SUITE: 0
    };

    // Contar habitaciones por tipo
    hotelRoomsFiltered.forEach(hotelRoom => {
      const roomType = hotelRoom.room.type;
      if (counts[roomType] !== undefined) {
        counts[roomType] += hotelRoom.quantity;
      }
    });

    return {
      estandar: counts.ESTANDAR,
      junior: counts.JUNIOR,
      suite: counts.SUITE
    };
  };

  // Obtener una imagen predeterminada para los hoteles
  const getDefaultHotelImage = (index) => {
    const defaultImages = [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ];

    return defaultImages[index % defaultImages.length];
  };

  // Calcular la calificación (simulada para este ejemplo)
  const getSimulatedRating = () => {
    // Generar una calificación entre 4.0 y 5.0
    return (4 + Math.random()).toFixed(1);
  };

  // Calcular la ocupación total de un hotel
  const getHotelOccupancy = (hotelId) => {
    const hotelRoomsFiltered = hotelRooms.filter(hotelRoom => hotelRoom.hotel.id === hotelId);

    // Calcular la suma de cantidad de todas las habitaciones asignadas
    return hotelRoomsFiltered.reduce((total, hotelRoom) => total + hotelRoom.quantity, 0);
  };

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
          {loading ? (
              <div className="loading-message">Cargando hoteles...</div>
          ) : error ? (
              <div className="error-message">{error}</div>
          ) : (
              <div className="hotels-grid">
                {hotels.length > 0 ? (
                    hotels.map((hotel, index) => {
                      // Obtener conteo de habitaciones para este hotel
                      const roomCounts = getRoomCountsByType(hotel.id);
                      // Obtener calificación simulada
                      const rating = getSimulatedRating();
                      // Obtener ocupación total
                      const occupancy = getHotelOccupancy(hotel.id);

                      return (
                          <div key={hotel.id} className="hotel-card">
                            <div
                                className="hotel-banner"
                                style={{ backgroundImage: `url(${getDefaultHotelImage(index)})` }}
                            >
                              <div className="hotel-banner-overlay">
                                <h2 className="hotel-name">{hotel.name}</h2>
                              </div>
                            </div>

                            <div className="hotel-content">
                              <div className="hotel-rating">
                                <span className="star-icon">★</span>
                                <span className="rating-value">{rating}</span>
                                <span className="divider">•</span>
                                <span className="location-icon">📍</span>
                                <span className="location-value">{hotel.city}</span>
                              </div>

                              <div className="hotel-rooms-container">
                                <div className="room-types-title">
                                  <span className="users-icon">👥</span>
                                  <span className="room-title">Tipos de habitaciones:</span>
                                </div>
                                <div className="room-types">
                                  <div className="room-type">
                                    <span className="room-type-count">{roomCounts.estandar}</span>
                                    <span className="room-type-name">Estándar</span>
                                  </div>
                                  <div className="room-type">
                                    <span className="room-type-count">{roomCounts.junior}</span>
                                    <span className="room-type-name">Junior</span>
                                  </div>
                                  <div className="room-type">
                                    <span className="room-type-count">{roomCounts.suite}</span>
                                    <span className="room-type-name">Suite</span>
                                  </div>
                                </div>
                              </div>

                              <div className="hotel-details">
                                <p className="hotel-address"><strong>Dirección:</strong> {hotel.address}</p>
                                <p className="hotel-capacity">
                                  <strong>Ocupación:</strong> {occupancy} de {hotel.maxRooms} habitaciones
                                </p>
                              </div>

                              <button className="availability-button">
                                Ver disponibilidad
                              </button>
                            </div>
                          </div>
                      );
                    })
                ) : (
                    <div className="no-hotels-message">
                      No hay hoteles disponibles en este momento.
                    </div>
                )}
              </div>
          )}
        </div>

        <footer className="home-footer">
          © 2025 Hoteles de Lujo | Experiencias Inolvidables
        </footer>
      </div>
  );
}

export default HomePage;