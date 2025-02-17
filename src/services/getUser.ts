import { User } from "../entities/user.entity"
import { UserRepository } from "./repositories"

export const getUser = async (userId: number): Promise<User> => {
  const user = await UserRepository.findOne({
    where: {id: userId},
    relations: ["categories", "blogs"]
  });

  if (!user) throw new Error("User not found");

  return user;
}