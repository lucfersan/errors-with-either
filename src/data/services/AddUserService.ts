import { AddUserRepository, UserExistsRepository } from '@/data/repositories'
import { Email, Name, User } from '@/domain/entities/user'
import {
  InvalidNameError,
  InvalidEmailError,
  EmailInUseError
} from '@/domain/entities/user/errors'
import { AddUser } from '@/domain/entities/user/useCases'
import { left, right } from '@/domain/logic'

export class AddUserService implements AddUser {
  constructor(
    private readonly userExistsRepository: UserExistsRepository,
    private readonly addUserRepository: AddUserRepository
  ) {}

  async execute({ name, email }: AddUser.Input): Promise<AddUser.Output> {
    const nameOrError = Name.create(name)
    const emailOrError = Email.create(email)

    if (nameOrError.isLeft()) return left(new InvalidNameError(name))
    else if (emailOrError.isLeft()) return left(new InvalidEmailError(email))

    const userOrError = User.create({
      name: nameOrError.value,
      email: emailOrError.value
    })

    if (userOrError.isLeft()) return left(userOrError.value)

    const user = userOrError.value

    const userExists = await this.userExistsRepository.exists({
      email: user.email.value
    })

    if (userExists) return left(new EmailInUseError(user.email.value))

    await this.addUserRepository.addUser({
      name: user.name.value,
      email: user.email.value
    })

    return right(user)
  }
}
