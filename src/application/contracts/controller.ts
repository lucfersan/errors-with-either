import { HttpResponse } from '@/application/contracts'

export interface Controller<T = any> {
  handle(httpRequest: T): Promise<HttpResponse>
}
