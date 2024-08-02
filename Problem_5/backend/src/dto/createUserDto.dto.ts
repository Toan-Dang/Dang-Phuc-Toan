import { getUserWithHighestId } from "../service/users.service";
export async function createUserDTO(data: any) {
  const user = await getUserWithHighestId();
  return {
    id: user ? user.id + 1 : 1,
    email: data.email,
    username: data.username,
    birthdate: data.birthdate,
  };
}
