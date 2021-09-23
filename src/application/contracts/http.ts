export type HttpResponse<T = any> = {
  statusCode: number
  body: T
}

export const ok = <T = any>(data: T): HttpResponse<T> => {
  return {
    statusCode: 200,
    body: data
  }
}

export const created = <T = any>(data: T): HttpResponse<T> => {
  return {
    statusCode: 201,
    body: data
  }
}

export const clientError = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: {
      error: error.message
    }
  }
}

export const conflict = (error: Error): HttpResponse => {
  return {
    statusCode: 409,
    body: {
      error: error.message
    }
  }
}

export const serverError = (error: Error): HttpResponse => {
  console.log(error)

  return {
    statusCode: 500,
    body: {
      error: error.message
    }
  }
}
