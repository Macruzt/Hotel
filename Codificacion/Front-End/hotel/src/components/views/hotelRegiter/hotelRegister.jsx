import React from 'react';
import '../Dashboard/Dashboard.css';

// Componente para Registrar Hotel
const HotelRegister = () => {
  return (
    <div className="content-section">
      <h2 className="section-title">Registro de Hotel</h2>
      <p className="section-description">
        Ingrese los datos para registrar un nuevo hotel en la cadena.
      </p>
      
      <div className="form-container">
        <form className="register-form">
          <div className="form-group">
            <label htmlFor="hotel-name">Nombre del Hotel</label>
            <input type="text" id="hotel-name" placeholder="Ingrese nombre del hotel" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Ciuddad</label>
              <input type="text" id="location" placeholder="Neiva, New York" />
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Dirección</label>
              <input type="text" id="location" placeholder="Calle, carrera" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Nit</label>
              <input type="text" id="location" placeholder="12345678910" />
            </div>
            
            <div className="form-group">
              <label htmlFor="stars">Maximo de habitaciones</label>
              <input type="text" id="habitacion" placeholder="Número de habitaciones?" />
            </div>
          </div>
          
          {/* <div className="form-group">
            <label htmlFor="hotel-description">Descripción</label>
            <textarea id="hotel-description" rows="4" placeholder="Descripción del hotel..."></textarea>
          </div> */}
          
          <div className="form-actions">
            <button type="submit" className="btn-primary">Registrar Hotel</button>
            <button type="reset" className="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>

      <div className="users-table-container">
        <h3 className="table-title">Usuarios Registrados</h3>
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Direccion</th>
              <th>Nit</th>
              <th>Habitaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Juan Pérez</td>
              <td>juan@example.com</td>
              <td>Administrador</td>
              <td>Administrador</td>
              <td>Activo</td>
              <td>
                <button className="action-btn edit">✏️</button>
                <button className="action-btn delete">🗑️</button>
              </td>
            </tr>
            <tr>
              <td>María López</td>
              <td>maria@example.com</td>
              <td>maria@example.com</td>
              <td>Gerente</td>
              <td>Activo</td>
              <td>
                <button className="action-btn edit">✏️</button>
                <button className="action-btn delete">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>  
    </div>
  );
};

export default HotelRegister;