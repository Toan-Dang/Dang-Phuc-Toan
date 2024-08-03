import { createHash } from "../service/jwt.service";
import moment from "moment";

export function createAcountDTO(data: any) {
  const password = createHash(data.password);

  return {
    email: data.email,
    password_hash: password,
    username: data.username,
    created_date: moment().toDate(),
  };
}
