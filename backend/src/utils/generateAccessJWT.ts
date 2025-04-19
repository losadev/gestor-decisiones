// generateAccessJWT.ts
import jwt from "jsonwebtoken";

export const generateAccessJWT = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
};
