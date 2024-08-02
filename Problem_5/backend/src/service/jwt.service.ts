import { JWT } from "../utils/constants.util";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function generateVerifyToken() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(JWT.SALT_ROUNDS));
  return { crypto: resetToken, hash };
}

function md5(string: string) {
  return crypto.createHash("md5").update(string).digest("hex");
}

export function createHash(password: string) {
  const hash = md5(password);
  return hash;
}

export function validateHash(hash: string, password: string) {
  const validHash = md5(password);
  return hash === validHash;
}
