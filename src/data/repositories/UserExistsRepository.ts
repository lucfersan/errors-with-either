export interface UserExistsRepository {
  exists(
    input: UserExistsRepository.Input
  ): Promise<UserExistsRepository.Output>
}

export namespace UserExistsRepository {
  export type Input = { email: string }
  export type Output = boolean
}
