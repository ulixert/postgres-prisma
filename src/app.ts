import express, { Express } from 'express';
import * as process from 'process';

import { PrismaClient } from '@prisma/client';

export const app: Express = express();

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: {
      name_age: {
        name: 'Alice',
        age: 24,
      },
    },
  });
  console.log(user);
  process.exit(0);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
