const UsersModel = require ('../Models/json/users.js')

class UsersController {
  // Get all billing data
  static async getAll (req, res) {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080', 'https://www.technologyline.com.ar', 'https://www.line-technology.com.ar']
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }

    try {
      const data = await UsersModel.getAll()
      res.json(data)
    }
    catch (error) {
      console.error('Error retrieving data by date:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = UsersController;
