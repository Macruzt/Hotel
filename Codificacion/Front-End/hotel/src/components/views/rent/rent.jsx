import React, { useState, useEffect } from "react";
import "../Dashboard/Dashboard.css";
import http from "../../services/httpInterceptor"; // Asumiendo que ya tienes configurado el interceptor

const RentasRegister = () => {
  // Estados para el formulario
  const [formData, setFormData] = useState({
    userId: "",
    hotelRoomId: "",
    startDate: "",
    endDate: "",
    totalPrice: "",
    observations: "",
  });

  // Estado para mensajes de error/éxito
  const [message, setMessage] = useState({ text: "", type: "" });

  // Estado para guardar la lista de rentas
  const [rents, setRents] = useState([]);

  // Estado para guardar la lista de usuarios
  const [users, setUsers] = useState([]);

  // Estado para guardar la lista de habitaciones
  const [hotelRooms, setHotelRooms] = useState([]);

  // Estado para controlar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para los errores de validación
  const [errors, setErrors] = useState({});

  // Cargar datos al iniciar el componente
  useEffect(() => {
    fetchRents();
    fetchUsers();
    fetchHotelRooms();
  }, []);

  // Función para obtener la lista de rentas
  const fetchRents = async () => {
    try {
      const response = await http.get("http://localhost:9000/api/rents");
      setRents(response.data);
    } catch (error) {
      console.error("Error al obtener rentas:", error);
      setMessage({
        text: "Error al cargar la lista de rentas",
        type: "error",
      });
    }
  };

  // Función para obtener la lista de usuarios
  const fetchUsers = async () => {
    try {   
      const response = await http.get("http://localhost:5432/hoteleria/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setMessage({
        text: "Error al cargar la lista de usuarios",
        type: "error",
      });
    }
  };

  // Función para obtener la lista de habitaciones
  const fetchHotelRooms = async () => {
    try {
      const response = await http.get("http://localhost:9000/api/hotelRooms");
      setHotelRooms(response.data);
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
      setMessage({
        text: "Error al cargar la lista de habitaciones",
        type: "error",
      });
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Limpiar error específico cuando el usuario comienza a escribir
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: null,
      });
    }
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar usuario
    if (!formData.userId) {
      newErrors.userId = "Debe seleccionar un usuario";
    }

    // Validar habitación
    if (!formData.hotelRoomId) {
      newErrors.hotelRoomId = "Debe seleccionar una habitación";
    }

    // Validar fecha de inicio
    if (!formData.startDate) {
      newErrors.startDate = "La fecha de inicio es requerida";
    }

    // Validar fecha de fin
    if (!formData.endDate) {
      newErrors.endDate = "La fecha de fin es requerida";
    } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate =
        "La fecha de fin debe ser posterior a la fecha de inicio";
    }

    // Validar precio total
    if (!formData.totalPrice) {
      newErrors.totalPrice = "El precio total es requerido";
    } else if (isNaN(formData.totalPrice) || formData.totalPrice <= 0) {
      newErrors.totalPrice = "El precio debe ser un número mayor que cero";
    }

    return newErrors;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    const formErrors = validateForm();
    setErrors(formErrors);

    // Si hay errores, detener el envío
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      // Datos a enviar a la API
      const rentData = {
        userId: formData.userId,
        hotelRoomId: formData.hotelRoomId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalPrice: parseFloat(formData.totalPrice),
        observations: formData.observations,
      };

      // Realizar la petición POST
      await http.post("http://localhost:9000/api/rents", rentData);

      // Mostrar mensaje de éxito
      setMessage({
        text: "Renta registrada exitosamente",
        type: "success",
      });

      // Limpiar formulario
      resetForm();

      // Actualizar lista de rentas
      fetchRents();
    } catch (error) {
      console.error("Error al registrar renta:", error);

      let errorMessage = "Error al registrar renta";

      // Mostrar mensaje de error específico si está disponible
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      setMessage({
        text: errorMessage,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      userId: "",
      hotelRoomId: "",
      startDate: "",
      endDate: "",
      totalPrice: "",
      observations: "",
    });
    setErrors({});
  };

  // Manejar cancelación
  const handleCancel = () => {
    resetForm();
    setMessage({ text: "", type: "" });
  };

  // Formatear fecha para mostrar en la tabla
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Registro de Rentas</h2>
      <p className="section-description">
        Complete el formulario para registrar nuevas rentas de habitaciones.
      </p>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="userId">Usuario</label>
              <select
                id="userId"
                value={formData.userId}
                onChange={handleChange}
                className={errors.userId ? "input-error" : ""}
                disabled={isSubmitting}
              >
                <option value="">Seleccionar usuario</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName} - {user.documentNumber}
                  </option>
                ))}
              </select>
              {errors.userId && (
                <span className="error-message">{errors.userId}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="hotelRoomId">Habitación</label>
              <select
                id="hotelRoomId"
                value={formData.hotelRoomId}
                onChange={handleChange}
                className={errors.hotelRoomId ? "input-error" : ""}
                disabled={isSubmitting}
              >
                <option value="">Seleccionar habitación</option>
                {hotelRooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.roomNumber} - {room.roomType} (${room.pricePerNight})
                  </option>
                ))}
              </select>
              {errors.hotelRoomId && (
                <span className="error-message">{errors.hotelRoomId}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Fecha de inicio</label>
              <input
                type="date"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={errors.startDate ? "input-error" : ""}
                disabled={isSubmitting}
              />
              {errors.startDate && (
                <span className="error-message">{errors.startDate}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Fecha de fin</label>
              <input
                type="date"
                id="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={errors.endDate ? "input-error" : ""}
                disabled={isSubmitting}
              />
              {errors.endDate && (
                <span className="error-message">{errors.endDate}</span>
              )}
            </div>
          </div>

          {/* <div className="form-group">
            <label htmlFor="totalPrice">Precio total</label>
            <input
              type="number"
              id="totalPrice"
              placeholder="Ingrese precio total"
              value={formData.totalPrice}
              onChange={handleChange}
              className={errors.totalPrice ? "input-error" : ""}
              disabled={isSubmitting}
            />
            {errors.totalPrice && (
              <span className="error-message">{errors.totalPrice}</span>
            )}
          </div> */}

          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar Renta"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div className="users-table-container">
        <h3 className="table-title">Rentas Registradas</h3>
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Habitación</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {rents.length > 0 ? (
              rents.map((rent) => {
                const user = users.find((u) => u.id === rent.userId) || {};
                const room =
                  hotelRooms.find((r) => r.id === rent.hotelRoomId) || {};

                return (
                  <tr key={rent.id}>
                    <td>{user.fullName || "Usuario desconocido"}</td>
                    <td>{room.roomNumber || "Habitación desconocida"}</td>
                    <td>{formatDate(rent.startDate)}</td>
                    <td>{formatDate(rent.endDate)}</td>
                    <td>${rent.totalPrice}</td>
                    <td>{rent.observations || "-"}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No hay rentas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentasRegister;
