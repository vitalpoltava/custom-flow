const {PrismaClient} = require('@prisma/client')
const express = require('express');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  const components = await prisma.component.findMany();
  const configs = await prisma.config.findMany({
    select: {
      componentId: true,
      page: true,
    }
  });
  res.json({components, configs});
});

router.post('/configs', async (req, res, next) => {
  await prisma.config.deleteMany();
  const newConfigs = await prisma.config.createMany({
    data: req.body.configs
  })

  res.json(newConfigs);
})

module.exports = router;
