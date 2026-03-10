import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      message: 'Validation error',
      issues: error.issues,
    })
    return
  }

  console.error(error)
  response.status(500).json({ message: 'Internal server error' })
}
