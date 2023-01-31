import { prisma } from "../src/server/db";

// eslint-disable-next-line @typescript-eslint/require-await
async function main() {
  const id = "cl9ebqhxk00003b600tymydho";
  // await prisma.example.upsert({
  //   where: {
  //     id,
  //   },
  //   create: {
  //     id,
  //   },
  //   update: {},
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
