import { AddUserService } from '@/data/services'
import { PrismaUsersRepository } from '@/infra/prisma/repositories'

export const makeAddUserService = (): AddUserService => {
  const prismaUsersRepository = new PrismaUsersRepository()
  return new AddUserService(prismaUsersRepository, prismaUsersRepository)
}
