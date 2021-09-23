import {
  Controller,
  HttpResponse,
  created,
  conflict,
  clientError,
  serverError
} from '@/application/contracts'
import { RequiredFieldError } from '@/application/errors'
import { EmailInUseError } from '@/domain/entities/user/errors'
import { AddUser } from '@/domain/entities/user/useCases'
import { Either, left, right } from '@/domain/logic'

type HttpRequest = {
  name: string
  email: string
}

type User = {
  id: string
  name: string
  email: string
}

export class AddUserController implements Controller {
  constructor(private readonly addUser: AddUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<User>> {
    try {
      const validOrError = this.validateRequest(httpRequest)

      if (validOrError.isLeft()) return clientError(validOrError.value)

      const { name, email } = httpRequest

      const addOrError = await this.addUser.execute({ name, email })

      if (addOrError.isLeft()) {
        const error = addOrError.value

        switch (error.constructor) {
          case EmailInUseError:
            return conflict(error)
          default:
            return clientError(error)
        }
      } else {
        const { id, name, email } = addOrError.value

        return created({
          id,
          name: name.value,
          email: email.value
        })
      }
    } catch (error) {
      return serverError(error)
    }
  }

  private validateRequest(
    httpRequest: HttpRequest
  ): Either<RequiredFieldError, null> {
    for (const field of ['name', 'email']) {
      if (
        httpRequest[field] === null ||
        httpRequest[field] === undefined ||
        (typeof httpRequest[field] === 'string' &&
          httpRequest[field].trim() === '')
      ) {
        return left(new RequiredFieldError(field))
      }
    }

    return right(null)
  }

  t
}
