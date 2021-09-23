import { AddUserRepository, UserExistsRepository } from '@/data/repositories'
import { prisma } from '@/infra/prisma/client'

export class PrismaUsersRepository
  implements UserExistsRepository, AddUserRepository
{
  async exists({
    email
  }: UserExistsRepository.Input): Promise<UserExistsRepository.Output> {
    const exists = await prisma.user.findUnique({ where: { email } })
    return !!exists
  }

  async addUser(
    input: AddUserRepository.Input
  ): Promise<AddUserRepository.Output> {
    await prisma.user.create({ data: input })
  }
}
