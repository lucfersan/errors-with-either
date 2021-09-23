import { AddUserController } from '@/application/controllers'
import { makeAddUserService } from '@/main/factories/services'

export const makeAddUserController = (): AddUserController => {
  return new AddUserController(makeAddUserService())
}
