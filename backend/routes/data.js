const {PrismaClient} = require('@prisma/client')
const express = require('express');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res, next) => {
  await prisma.data.deleteMany();
  const newData = await prisma.data.createMany({
    data: req.body.data
  })

  res.json(newData);
})

module.exports = router;
