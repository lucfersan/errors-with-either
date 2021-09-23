export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`The ${email} is invalid.`)
    this.name = 'InvalidEmailError'
  }
}
