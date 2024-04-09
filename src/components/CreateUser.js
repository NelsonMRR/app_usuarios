import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: ''
  });

  const home = () => {
    window.location.href = '/';
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users', formData);
      alert('Usuario creado exitosamente');
      setFormData({ nombre: '', apellido: '', email: '' });
      window.location.href = '/';
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Error al crear el usuario');
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Usuario</h1>
        <button className={"button"} onClick={home}>Home</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
}

export default CreateUser;
