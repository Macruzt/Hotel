import React, { useState } from 'react';
import './Login.css'; // Usa el CSS actualizado

function Login() {
  // Estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  // Validación de formulario
  const validateForm = () => {
    const newErrors = {};
    
    // Validar email
    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Formato de correo electrónico inválido';
    }
    
    // Validar contraseña
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    return newErrors;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    const formErrors = validateForm();
    setErrors(formErrors);
    
    // Si no hay errores, proceder con el envío
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      setLoginMessage('');
      
      try {
        // Aquí iría tu llamada a la API para autenticar
        // Ejemplo:
        // const response = await fetch('https://tu-api.com/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ email, password }),
        // });
        // const data = await response.json();
        
        // Simulación de respuesta exitosa (reemplazar con tu lógica real)
        setTimeout(() => {
          console.log('Iniciando sesión con:', { email, password });
          setLoginMessage('¡Inicio de sesión exitoso!');
          // Aquí puedes redirigir al usuario o guardar el token en localStorage
          // localStorage.setItem('token', data.token);
          // window.location.href = '/dashboard';
          setIsSubmitting(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error de inicio de sesión:', error);
        setLoginMessage('Error al iniciar sesión. Intente nuevamente.');
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        {/* Logo o título con estilo similar al header del homepage */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#FFD700', marginRight: '8px', fontSize: '24px' }}>★</span>
            <h2 style={{ margin: '0' }}>Iniciar Sesión</h2>
          </div>
        </div>
        
        {loginMessage && (
          <div className={`message ${loginMessage.includes('exitoso') ? 'success' : 'error'}`}>
            {loginMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'input-error' : ''}
              placeholder="correo@ejemplo.com"
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'input-error' : ''}
              placeholder="Tu contraseña"
              disabled={isSubmitting}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-actions">
            <button type="submit" disabled={isSubmitting} className="login-button">
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
          
          <div className="form-footer">
            <a href="/forgot-password" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
            <p>
              ¿No tienes una cuenta? <a href="/register">Regístrate</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;