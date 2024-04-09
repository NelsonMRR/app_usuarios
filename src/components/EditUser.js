import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({ nombre: '', apellido: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, [id]);

  const home = () => {
    window.location.href = '/';
  }
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/users/${id}`, user);
      alert('Usuario actualizado exitosamente');
      window.location.href = '/';
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      alert('Error al actualizar el usuario');
    }
  };

  return (
    <div>
      <h1>Editar Usuario</h1>
        <button className={"button"} onClick={home}>Home</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={user.nombre} onChange={handleChange} />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" name="apellido" value={user.apellido} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <button type="submit">Actualizar Usuario</button>
      </form>
    </div>
  );
}

export default EditUser;
