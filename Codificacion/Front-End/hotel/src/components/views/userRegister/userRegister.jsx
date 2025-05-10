import React from 'react';
import '../Dashboard/Dashboard.css';

// Componente para Registrar Usuarios
const UsuariosRegister = () => {
  return (
    <div className="content-section">
      <h2 className="section-title">Registro de Usuarios</h2>
      <p className="section-description">
        Complete el formulario para registrar nuevos usuarios en el sistema.
      </p>
      
      <div className="form-container">
        <form className="register-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input type="text" id="nombre" placeholder="Ingrese nombre completo" />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" placeholder="Ingrese correo electrónico" />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" placeholder="Ingrese contraseña" />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirm-password">Confirmar contraseña</label>
              <input type="password" id="confirm-password" placeholder="Confirme contraseña" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Tipo de documento</label>
              <select id="role">
                <option value="">Seleccionar tipo</option>
                <option value="admin">C.C</option>
                <option value="manager">C.E</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Número de documento</label>
              <input type="text" id="nombre" placeholder="Ingrese número de documento" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Número telefonico</label>
            <input type="text" id="nombre" placeholder="Ingrese número telefonico" />
          </div>
          
          {/* <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Rol de usuario</label>
              <select id="role">
                <option value="">Seleccionar rol</option>
                <option value="admin">Administrador</option>
                <option value="manager">Gerente</option>
                <option value="receptionist">Recepcionista</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Estado</label>
              <select id="status">
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </div> */}

          <div className="form-actions">
            <button type="submit" className="btn-primary">Guardar Usuario</button>
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
              <th>Correo</th>
              <th>Tipo de documento</th>
              <th>Numero de documento</th>
              <th>Numero telefonico</th>
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

export default UsuariosRegister;