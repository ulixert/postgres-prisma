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

app.get('/api/v1/users', async (_, res, next) => {
  try {
    const users = await prisma.post.findMany({
      where: {
        author: {
          is: {
            age: 15,
          },
        },
      },
    });

    if (users.length === 0) {
      throw new Error('No users found');
    }

    res.status(200).json({
      status: 'success',
      count: users.length,
      data: {
        users,
      },
    });
  } catch (e) {
    next(e);
  }
});

app.patch('/api/v1/users/:id', async (_, res, next) => {
  try {
    // const userData = UserUpdateInputSchema.parse(req.body);
    const user = await prisma.user.update({
      where: {
        email: 'saleem_lockea9@attend.wnb',
      },
      data: {
        userPreference: {
          disconnect: true,
        },
      },
    });

    // const user = await prisma.user.findFirst({
    //   where: {
    //     name: 'John',
    //     userPreference: {
    //       emailUpdates: false,
    //     },
    //   },
    //   include: {
    //     userPreference: true,
    //   },
    // });

    res.status(200).json({
      status: 'success',
      message: 'User updated',
      data: {
        user,
      },
    });
  } catch (e) {
    next(e);
  }
});

app.delete('/api/v1/users/:id', async (_, res, next) => {
  try {
    const user = await prisma.user.delete({
      where: {
        email: '',
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'User deleted',
      data: {
        user,
      },
    });
  } catch (e) {
    next(e);
  }
});

app.use(errorMiddleware);
