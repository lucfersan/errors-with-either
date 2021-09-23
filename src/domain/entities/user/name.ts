import { InvalidNameError } from '@/domain/entities/user/errors'
import { Either, left, right } from '@/domain/logic'

export class Name {
  constructor(private readonly name: string) {}

  get value(): string {
    return this.name
  }

  static validate(name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 255) {
      return false
    }

    return true
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (!this.validate(name)) {
      return left(new InvalidNameError(name))
    }

    return right(new Name(name))
  }
}
