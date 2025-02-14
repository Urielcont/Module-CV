import { conexionDB } from "../config/configDb";
import { User } from "../models/user";
// Crear usuario segun los tipos de datos que esperamos recibir

  
// Función para consultar si el usuario existe
export const fetchGetUserByEmail = async (email: string): Promise<User | null> => {
    const result = await conexionDB.query('SELECT * FROM users WHERE email = $1', [email]);  
    if (result.rows.length === 0) {
      return null;
    }
    // Retorna el primer usuario encontrado
    return result.rows[0] as User; 
  };

// Función para crear un nuevo usuario
export const fetchCreateUser = async (user): Promise<User | null> => {
    try {
      const { username, email, password, rol, status } = user;
      const result = await conexionDB.query(
        'INSERT INTO users (username, email, password, rol, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [username, email, password, rol, status]
      );
      return result.rows[0]; 
    } catch (err) {
      console.error('Error al crear el usuario', err);
      throw new Error('Error al crear el usuario');
    }
  };

// Crear un usuario en la base de datos
export const crearUsuario = async (
  email: string,
  password: string,
  role: string
) => {
  const query = `
    INSERT INTO users (email, password, role, status, created_at, updated_at)
    VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING *;
  `;
  
  const values = [email, password, role, "active"];

  try {
    const { rows } = await conexionDB.query(query, values);
    return rows[0];  // Retorna el nuevo usuario registrado
  } catch (err) {
    console.error("Error al crear el usuario:", err.message);
    throw new Error("No se pudo crear el usuario.");
  }
};

