const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const components = [
  {
    id: 1,
    name: 'about',
  },
  {
    id: 2,
    name: 'address',
  },
  {
    id: 3,
    name: 'birthdate',
  }
];

const config = [
  {
    componentId: 1,
    page: 2,
  },
  {
    componentId: 2,
    page: 3,
  },
]

async function main() {
  await prisma.component.deleteMany();
  for (const item of components) {
    await prisma.component.create({
      data: item,
    });
  }

  await prisma.config.deleteMany();
  for (const item of config) {
    await prisma.config.create({
      data: item,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
