import { RequestHandler, Response } from 'express'

import { Controller } from '@/application/contracts'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter =
  controller =>
  async (req, res): Promise<Response> => {
    const { statusCode, body } = await controller.handle({ ...req.body })
    return res.status(statusCode).json(body)
  }
