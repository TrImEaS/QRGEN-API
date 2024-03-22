import { validatePartialBillingData } from '../Schemas/billingData.js'
import { BillingDataModel } from '../Models/billingData.js'
import { createQR, createCode } from '../createQrCode.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import validateBillingData from '../Schemas/billingData.js'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export class BillingDataController {

  // Get all billing data
  static async getAll (req, res) {
    const { company, client, numberBill, user } = req.query
    const data = await BillingDataModel.getAll({ company, client, numberBill, user })
    res.json(data)
  }

  // Get billing data by id
  static async getById (req, res) {
    let { id } = req.params
    const data = await BillingDataModel.getById(parseInt(id))
    if (data) return res.json(data)
    
    res.status(404).json({ message: 'Billing data not found' })
  }

  // Get billing data create date by date
  static async getCreateDateByDate(req,res) {
    const { date } = req.params;

    try {
      const data = await BillingDataModel.getCreateDateByDate(date);
      res.json(data);
    } 
    catch (error) {
      console.error('Error retrieving data by date:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // Get billing data create date by time
  static async getCreateDateByTime(req,res) {
    const { time } = req.params;

    try {
      const data = await BillingDataModel.getCreateDateByTime(time);
      return res.json(data);
    } 
    catch (error) {
      console.error('Error retrieving data by time:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get billing data create date by date
  static async getCheckDateByDate(req,res) {
    const { date } = req.params;

    try {
      const data = await BillingDataModel.getCheckDateByDate(date);
      res.json(data);
    } 
    catch (error) {
      console.error('Error retrieving data by date:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // Get billing data create date by time
  static async getCheckDateByTime(req,res) {
    const { time } = req.params;

    try {
      const data = await BillingDataModel.getCheckDateByTime(time);
      return res.json(data);
    } 
    catch (error) {
      console.error('Error retrieving data by time:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Create an billing data
  static async create (req, res) { 
    const { user, company, billingNumber } = req.body
    let codeNameLink = ''
    let code = 0

    try {
      const data = await createCode()
      codeNameLink = data.htmlName
      code = data.validationCode

      const htmlQRName = await createQR(data.htmlName, { user, billingNumber, company })
      
      const inputData = {
        user: req.body.user,
        createDate: req.body.createDate,
        company: req.body.company,
        client: parseInt(req.body.clientNumber),
        numberBill: parseInt(req.body.billingNumber),
        verificationNumber: code, 
        link: codeNameLink 
      }
      const result = validateBillingData(inputData)
  
      if (result.error){
        return res.status(422).json({ error: JSON.parse(result.error.message) })
      }

      const existingData = await BillingDataModel.create({ input: inputData })
      
      if (!existingData) {
        // Eliminar archivos generados si ya existen datos previos
        const filePathQR = path.join(__dirname, `../../Files/QRs/${htmlQRName}`);
        const filePathHTML = path.join(__dirname, `../../Files/Codes/${data.htmlName}`);
        
        if (fs.existsSync(filePathQR)) {
          fs.unlinkSync(filePathQR);
          console.log('QR borrado')
        }

        if (fs.existsSync(filePathHTML)) {
          fs.unlinkSync(filePathHTML)
          console.log('HTMLCode borrado')
        }

        return res.status(409).json({ error: 'El numero de factura ya esta en uso para este cliente' })
      }

      const filePath = path.join(__dirname, `../../Files/QRs/${htmlQRName}`)
      res.sendFile(filePath)
    } 
    catch (e) {
      console.log('Error updating billing data: ', e)

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Edit billing data by id
  static async update (req, res) { 
    try {
      const result = validatePartialBillingData(req.body)
      
      if (!result.success) 
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      
      const { id } = req.params
    
      const updatedata = await BillingDataModel.update({ id, input: result.data })  
    
      return res.json(updatedata)

    } 
    catch (e) {
      console.log('Error updating billing data: ', e)

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Esto no borra, sino que pone en estado de desactivado...
  // static async delete (req, res) {
  //   const { id } = req.params

  //   try {
  //     const result = await BillingDataModel.delete({ id: parseInt(id) })
  
  //     if (!result) {
  //       return res.status(404).json({ error: 'Billing data not found'})
  //     }
  
  //     return res.json(result)
  //   } 
  //   catch (e) {
  //     console.log('Error deleting billing data: ', e)

  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // }
}
