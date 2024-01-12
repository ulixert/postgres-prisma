import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create user
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'John Doe',
  //     email: 'john@gmail.com',
  //   },
  // });
  // console.log(user);

  // Get all users
  // const users = await prisma.user.findMany({
  //   include: {
  //     articles: true,
  //   },
  // });

  // Create article and associate it with user
  // const article = await prisma.article.create({
  //   data: {
  //     title: 'Johns First Article',
  //     body: 'This is Johns first article',
  //     author: {
  //       connect: {
  //         id: 1,
  //       },
  //     },
  //   },
  // });

  // Get all articles
  // const articles = await prisma.article.findMany();

  // Create user and article and associate them
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Jane Doe',
  //     email: 'jane@gmail.com',
  //     articles: {
  //       create: [
  //         {
  //           title: 'Jane First Article',
  //           body: 'This is Jane first article',
  //         },
  //         {
  //           title: 'Jane Second Article',
  //           body: 'This is Jane second article',
  //         },
  //       ],
  //     },
  //   },
  // });

  // Create another article and associate it with jane
  // const article = await prisma.article.create({
  //   data: {
  //     title: 'Jane Third Article',
  //     body: 'This is Jane third article',
  //     author: {
  //       connect: { email: 'jane@gmail.com' },
  //     },
  //   },
  // });

  // const articles = await prisma.article.findMany({
  //   where: {
  //     author: {
  //       name: 'Jane Doe',
  //     },
  //   },
  // });

  // Loop over Jane's articles
  // users.forEach((user) => {
  //   console.log(`User: ${user.name}, Email: ${user.email}`);
  //   console.log('Articles:');
  //   user.articles.forEach((article) => {
  //     console.log(`- Title: ${article.title}, Body: ${article.body}`);
  //   });
  //   console.log('\n');
  // });

  // Update data
  // const user = await prisma.user.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: {
  //     name: 'John Doe Jr.',
  //   },
  // });

  // Remove data
  // const article = await prisma.article.delete({
  //   where: {
  //     id: 4,
  //   },
  // });

  const users = await prisma.user.findMany({
    include: {
      articles: true,
    },
  });
  console.log(users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
