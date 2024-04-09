import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

    const crear = () => {
      window.location.href = '/crear-usuario';
    }
    const editar = async (id) => {
      window.location.href = `/editar-usuario/${id}`;
    }


  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      alert('Usuario eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      alert('Error al eliminar el usuario');
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <Link to="/crear-usuario">
        <button className={"button"} onClick={crear}>Crear Nuevo Usuario</button>
      </Link>
      {users.map(user => (
        <div key={user.id}>
          <p>Nombre: {user.nombre}</p>
          <p>Apellido: {user.apellido}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => handleDelete(user.id)}>Eliminar</button>
          <Link to={`/editar-usuario/${user.id}`}>
            <button onClick={() => editar(user.id)}>Editar</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UserList;
