import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class BillingDataModel {

 // Get all concepts but if param exist return only this data
  static async getAll ({ company, client, numberBill, user }) {

    if(company){
      const data = await prisma.billingdata.findMany({
        where: {
          company: {
            equals: company.toLowerCase(),
          }
        }
      })
      return data
    }

    if(client){
      const data = await prisma.billingdata.findMany({
        where: {
          client: {
            equals: parseInt(client),
          }
        }
      })
      return data
    }

    if(numberBill){
      const data = await prisma.billingdata.findMany({
        where: {
          numberBill: {
            equals: parseInt(numberBill),
          }
        }
      })
      return data
    }
    if(user){
      const data = await prisma.billingdata.findMany({
        where: {
          user: {
            equals: user.toLowerCase(),
          }
        }
      })
      return data
    }
    
    const data = await prisma.billingdata.findMany()
    
    return data;
  }


  
  //Get by date
  static async getCreateDateByDate(date) {
    const data = await prisma.billingdata.findMany({
      where: {
        createDate: {
          startsWith: date,
        },
      },
    })
    return data;
  }

  //Get by time
  static async getCreateDateByTime(time) {
    const data = await prisma.billingdata.findMany({
      where: {
        createDate: {
          contains: time,
        },
      },
    })
    return data;
  }

  //Get by date
  static async getCheckDateByDate(date) {
    const data = await prisma.billingdata.findMany({
      where: {
        checkDate: {
          startsWith: date,
        },
      },
    })
    return data;
  }

  //Get by time
  static async getCheckDateByTime(time) {
    const data = await prisma.billingdata.findMany({
      where: {
        checkDate: {
          contains: time,
        },
      },
    })
    return data;
  }

  // Get an concept by id
  static async getById (id) {
    const data = await prisma.billingdata.findUnique({
      where: {
        id: id
      },
    })
    return data
  }

  // Create billing data
  static async create ({ input }) {
    if (!input) {
      throw new Error('Input is undefined');
    }
  
    try {
      const existingData = await prisma.billingdata.findFirst({
        where: {
          client: input.client,
          numberBill: input.numberBill
        }
      })

      if (existingData) {
        return false
      }

      const newBillingData = await prisma.billingdata.create({ data: {...input} })
      console.log('New billing data created:', newBillingData)
      return newBillingData
    } catch (error) {
      console.error('Error creating billing data:', error)
      throw error
    }
  }

  // Edit an employee with the id
  static async update ({ id, input }) {
    const updatedBillingData = await prisma.billingdata.update({
      where: { id: parseInt(id) },
      data: input
    })

    return updatedBillingData
  }

  // static async delete ({ id }) {
  //   const result = await prisma.billingdata.delete({
  //     where:{ id: id}
  //   })
    
  //   return result
  // }
}