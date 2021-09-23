export class InvalidNameError extends Error {
  constructor(name: string) {
    super(`The ${name} is invalid.`)
    this.name = 'InvalidNameError'
  }
}
