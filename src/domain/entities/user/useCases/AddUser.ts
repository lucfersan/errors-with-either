import { User } from '@/domain/entities/user'
import {
  EmailInUseError,
  InvalidEmailError,
  InvalidNameError
} from '@/domain/entities/user/errors'
import { Either } from '@/domain/logic'

export interface AddUser {
  execute(input: AddUser.Input): Promise<AddUser.Output>
}

export namespace AddUser {
  export type Input = {
    name: string
    email: string
  }
  export type Output = Either<
    EmailInUseError | InvalidEmailError | InvalidNameError,
    User
  >
}
