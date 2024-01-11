import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  if (err instanceof ZodError) {
    const errors = err.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
    }));

    res.status(400).json({
      status: 'fail',
      message: '💥Validation failed',
      data: {
        errors,
      },
    });
    return;
  }

  if (err instanceof Error) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: '💥Internal server error',
  });
};
