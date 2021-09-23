import { Router } from 'express'

import { adaptExpressRoute } from '@/main/adapters'
import { makeAddUserController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/users', adaptExpressRoute(makeAddUserController()))
}
