import { UserAttributes } from "../types/User"; // ajusta la ruta si es necesario

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}

export {}; // necesario para que sea un módulo y se aplique la declaración global
