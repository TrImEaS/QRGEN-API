const { Router } = require ('express')
const  BillingDataController  = require ('../Controllers/billingData.js')

const billingDataRouter = Router()

billingDataRouter.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir acceso desde cualquier origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH'); // Métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
  next()
})

billingDataRouter.get('/', BillingDataController.getAll)
billingDataRouter.post('/', BillingDataController.create)

billingDataRouter.get('/:id', BillingDataController.getById)
billingDataRouter.get('/:id', BillingDataController.getById)
billingDataRouter.get('/createDate/byDate/:date', BillingDataController.getCreateDateByDate)
billingDataRouter.get('/createDate/byTime/:time', BillingDataController.getCreateDateByTime)
billingDataRouter.get('/checkDate/byDate/:date', BillingDataController.getCheckDateByDate)
billingDataRouter.get('/checkDate/byTime/:time', BillingDataController.getCheckDateByTime)

billingDataRouter.patch('/:id', BillingDataController.update)

module.exports = billingDataRouter
// billingDataRouter.delete('/:id', BillingDataController.delete)