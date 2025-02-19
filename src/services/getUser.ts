import { NextFunction } from "express";
import { User } from "../entities/user.entity"
import { UserRepository } from "./repositories"

export const getUser = async (userId: number, next: NextFunction): Promise<User | void> => {
  try {
    const user = await UserRepository.findOne({
      where: {id: userId},
      relations: ["categories", "blogs"]
    });
  
    if (!user) throw new Error("User not found");
  
    return user;
  } catch (error) {
    return next(error);
  }
}