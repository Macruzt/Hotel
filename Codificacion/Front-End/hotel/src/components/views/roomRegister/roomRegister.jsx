import React from 'react';
import '../Dashboard/Dashboard.css';

// Componente para Registrar Habitación
const RoomRegister = () => {
  return (
    <div className="content-section">
      <h2 className="section-title">Registro de Habitación</h2>
      <p className="section-description">
        Complete el formulario para añadir una nueva habitación al inventario.
      </p>
      
      <div className="form-container">
        <form className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hotel-select">Tipo de habitacion</label>
              <select id="hotel-select">
                <option value="">Seleccionar tipo de habitacion</option>
                <option value="1">Habitacion estandar</option>
                <option value="2">Habitacion Junior</option>
                <option value="3">Habitacion suite</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="hotel-select">Tipo de comodidad</label>
              <select id="hotel-select">
                <option value="">Seleccionar tipo de comodidad</option>
                <option value="1">Comodidad sencilla</option>
                <option value="2">Comodidad doble</option>
                <option value="3">Comodidad triple</option>
                <option value="3">Comodidad cuatriple</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Registrar Habitación</button>
            <button type="reset" className="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>

      <div className="users-table-container">
        <h3 className="table-title">Usuarios Registrados</h3>
        <table className="users-table">
          <thead>
            <tr>
              <th>Tipo de habitacion</th>
              <th>Tipo de comodidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Juan Pérez</td>
              <td>juan@example.com</td>
              <td>
                <button className="action-btn edit">✏️</button>
                <button className="action-btn delete">🗑️</button>
              </td>
            </tr>
            <tr>
              <td>María López</td>
              <td>Gerente</td>
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

export default RoomRegister;