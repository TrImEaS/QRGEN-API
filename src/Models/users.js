import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export class UserModel {
  static async getUser({ user, password }) { 
    const result = await prisma.users.findFirst({
      where: {
        user: user.toLowerCase(),
        password: password,
      },
    })
    return result
  }
}