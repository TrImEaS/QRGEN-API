import { Router } from 'express'
import { BillingDataController } from '../Controllers/billingData.js'

export const billingDataRouter = Router()

billingDataRouter.get('/', BillingDataController.getAll)
billingDataRouter.post('/', BillingDataController.create)

billingDataRouter.get('/:id', BillingDataController.getById)
billingDataRouter.get('/:id', BillingDataController.getById)
billingDataRouter.get('/createDate/byDate/:date', BillingDataController.getCreateDateByDate)
billingDataRouter.get('/createDate/byTime/:time', BillingDataController.getCreateDateByTime)
billingDataRouter.get('/checkDate/byDate/:date', BillingDataController.getCheckDateByDate)
billingDataRouter.get('/checkDate/byTime/:time', BillingDataController.getCheckDateByTime)

billingDataRouter.patch('/:id', BillingDataController.update)



// billingDataRouter.delete('/:id', BillingDataController.delete)