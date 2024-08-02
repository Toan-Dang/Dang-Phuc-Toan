import { createHash } from "../service/jwt.service";
import moment from "moment";

export function createAcountDTO(data: any) {
  const password = createHash(data.password);

  return {
    id: data.user_id || `${Date.now()}`,
    email: data.email,
    password: password,
    username: data.username,
    birth_day: data.birth_day,
    created_date: moment().toDate(),
    updated_date: moment().toDate(),
  };
}
