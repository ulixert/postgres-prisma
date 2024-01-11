import express, { Express } from 'express';

import { PrismaClient } from '@prisma/client';

import { UserCreateInputSchema } from '../prisma/generated/zod/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

export const app: Express = express();
app.use(express.json());

const prisma = new PrismaClient();

// async function main() {
//   const user = await prisma.user.findUnique({
//     where: {
//       name_age: {
//         name: 'Alice',
//         age: 24,
//       },
//     },
//   });
//   console.log(user);
//   process.exit(0);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

app.post('/api/v1/users', async (req, res, next) => {
  try {
    const user = UserCreateInputSchema.parse(req.body);
    const createUser = await prisma.user.create({
      data: user,
    });

    res.status(201).json({
      status: 'success',
      message: 'User created',
      data: {
        user: createUser,
      },
    });
  } catch (e) {
    next(e);
  }
});

app.use(errorMiddleware);
