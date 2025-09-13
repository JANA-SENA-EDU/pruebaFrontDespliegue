export interface LoginResponse {
    exitoso: boolean;
    message: string;
    data: {
      token: string;
      userName: string;
      nombre: string;
      correo: string;
      telefono: string;
    };
  }