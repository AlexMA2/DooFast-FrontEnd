export interface User {
  role: string;
  username: string;
}

export interface UserLogin {
  correo: string;
  contrasenia: string;
}

export interface UpdateUser {
  usuario: string;
  nombreUsuario: string;
  contrasenia: string;
  nroCelular: string;
  correoElectronico: string;
  idRestaurante: number;
  idRol: number;
}
