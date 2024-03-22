import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import bcrypt from 'bcrypt'


const libsql = createClient({
  url: "libsql://technologyline-database-trimeas.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MDg2MzI2NDksImlkIjoiY2Y0YzhiODktZDE3Yi0xMWVlLWEyYTctOGU4YjRkMDEwY2ViIn0.2SH_T4fnPJIT4V5RV8NT9s2peRX19ArtmnY4Kp4bmrMg1ZkyKFltOUUz6-RfkoD9Ams6Zh9Sbtq-pOIaltoGBQ",
})

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

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