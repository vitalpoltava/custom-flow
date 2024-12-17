const {PrismaClient} = require('@prisma/client')
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res, next) => {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(req.body.password, salt);
  const newUser = await prisma.user.create({
    data: {
      name: req.body.name,
      password,
    }
  });

  const config = await prisma.config.findMany({
    include: {
      component: {
        select: {
          name: true,
        },
      },
    }
  })

  res.json(config);
});

module.exports = router;
