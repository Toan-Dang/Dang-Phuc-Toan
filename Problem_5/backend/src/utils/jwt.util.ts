/* eslint-disable @typescript-eslint/ban-types */
import jwt, { SignOptions } from "jsonwebtoken";

export const signJwt = (
  payload: Object,
  secretKey: any,
  options: SignOptions = {}
) => {
  return jwt.sign(payload, secretKey, {
    ...(options && options),
    algorithm: "HS256",
  });
};

export const verifyJwt = (token: string, secretKey: any) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
