import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "Admin",
      email: "admin@admin.com",
      password: "123456",
    },
  });
  console.log({ user });
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit();
  });
