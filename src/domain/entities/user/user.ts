import { randomUUID } from 'crypto'

import { Email, Name } from '@/domain/entities/user'
import {
  InvalidEmailError,
  InvalidNameError
} from '@/domain/entities/user/errors'
import { Either, right } from '@/domain/logic'

type Props = {
  name: Name
  email: Email
}

export class User {
  constructor(private readonly props: Props, readonly id?: string) {
    if (!id) {
      this.id = randomUUID()
    }
  }

  get name(): Name {
    return this.props.name
  }

  get email(): Email {
    return this.props.email
  }

  static create(
    props: Props
  ): Either<InvalidEmailError | InvalidNameError, User> {
    const user = new User(props)
    return right(user)
  }
}
