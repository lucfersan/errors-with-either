import { AddUser } from '@/domain/entities/user/useCases'

export namespace AddUserRepository {
  export type Input = AddUser.Input
  export type Output = void
}

export interface AddUserRepository {
  addUser(input: AddUserRepository.Input): Promise<AddUserRepository.Output>
}
