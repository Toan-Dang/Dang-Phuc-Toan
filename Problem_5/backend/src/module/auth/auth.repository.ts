import { userRepository } from "../../config/postgres";
import { createAcountDTO } from "../../dto/createAccountDto.dto";
export async function findAccountByUsername (username: string) {
  try {
    return await userRepository.findOne({
      where: {
        username: username
      }
    })
  } catch (error) {
    console.error("findAccountByUsername repository error", error);
  }
}

export async function createNewAccount(data: any) {
  try {
    const user = createAcountDTO(data);
    console.log(user);
    
    await userRepository.save(user);
    return user;
  } catch (error) {
    console.error("createNewAccount repository error", error);
  }
}