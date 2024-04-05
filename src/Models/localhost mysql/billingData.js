const { Sequelize, DataTypes } = require('sequelize')
const mysql = require('mysql2')

// const sequelize = new Sequelize('QRGEN', 'Thomas2024az', 'Az2024Thomas', {
//   dialect: 'mysql',
//   host: 'localhost',
//   port: 3306,
// })

// const BillingData = sequelize.define('BillingData', {
//   company: {
//     type: DataTypes.ENUM('technologyline', 'linetechnology', 'tline', 'realcolor', 'power'),
//     allowNull: false
//   },
//   client: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   numberBill: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   createDate: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   verificationNumber: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   link: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   user: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// })

class BillingDataModel {
  static async getAll({ company, client, numberBill, user }) {
    if (company) {
      return await BillingData.findAll({ where: { company: company.toLowerCase() } })
    } 
    
    if (client) {
      return await BillingData.findAll({ where: { client: parseInt(client) } })
    } 
    
    if (numberBill) {
      return await BillingData.findAll({ where: { numberBill: parseInt(numberBill) } })
    } 
    
    if (user) {
      return await BillingData.findAll({ where: { user: user.toLowerCase() } })
    }

    return await BillingData.findAll({ attributes: ['id', 'company', 'client', 'numberBill', 'createDate', 'checkDate', 'verificationNumber', 'link', 'user'] })
  }

  static async getCreateDateByDate(date) {
    const data = await BillingData.findAll({
      where: {
        createDate: { [Sequelize.Op.startsWith]: date }
      }
    })
    return data
  }

  static async getCreateDateByTime(time) {
    const data = await BillingData.findAll({
      where: {
        createDate: { [Sequelize.Op.like]: `%${time}%` }
      }
    })
    return data
  }

  static async getCheckDateByDate(date) {
    const data = await BillingData.findAll({
      where: {
        checkDate: { [Sequelize.Op.startsWith]: date }
      }
    })
    return data
  }

  static async getCheckDateByTime(time) {
    const data = await BillingData.findAll({
      where: {
        checkDate: { [Sequelize.Op.like]: `%${time}%` }
      }
    })
    return data
  }

  static async getById(id) {
    const data = await BillingData.findByPk(id)
    return data
  }

  ////////////////////////////////////////////////
  static async create({ input }) {
    try {
      const existingData = await BillingData.findOne({
        where: {
          client: parseInt(input.client),
          numberBill: parseInt(input.numberBill)
        }
      })

      if (existingData) {
        return false
      }

      const newData = await BillingData.create(input)
      console.log('New billing data created:', newData.id)
      return newData
    } catch (error) {
      console.error('Error creating billing data:', error)
      throw error
    }
  }

  static async update({ id, input }) {
    try {
      const [updatedRows] = await BillingData.update(input, {
        where: { id: id }
      })

      return updatedRows > 0
    } catch (error) {
      console.error('Error updating billing data:', error)
      throw error
    }
  }
}

// (async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('Connection to database has been established successfully.')
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// })()

module.exports = BillingDataModel
