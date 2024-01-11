import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  if (err instanceof ZodError) {
    console.error(err);
    res.status(400).json({
      status: 'fail',
      message: '💥Zod Validation failed',
      error: err.errors,
    });
    return;
  }

  if (err instanceof Error) {
    console.error(err.message);
    res.status(404).json({
      status: 'fail',
      message: err.message,
      error: err.message.split('\n').at(-1),
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: '💥Internal server error',
  });
};
