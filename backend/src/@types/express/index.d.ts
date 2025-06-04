import { UserAttributes } from "../user.types";

declare global {
  namespace Express {
    export interface Request {
      user?: UserAttributes;
    }
  }
}

export {};
