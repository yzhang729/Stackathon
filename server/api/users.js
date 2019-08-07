const router = require('express').Router();
const { db, Users, Fridge } = require('../db/index');

const userNotFound = next => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};

router.post('/create', async (req, res, next) => {
  try {
    Users.create(req.body).then(async newUser => {
      req.session.userId = newUser.id;
      const returnUser = await Users.findByPk(newUser.id, {
        include: [{ model: Fridge }],
      });
      res.json(returnUser);
    });
  } catch (err) {
    console.log('an error has occurred');
  }
});

router.put('/login', (req, res, next) => {
  Users.findOne({
    where: {
      email: req.body.email,
    },
    include: [
      {
        model: Fridge,
      },
    ],
  })
    .then(user => {
      if (user && user.correctPassword(req.body.password)) {
        req.login(user, err => (err ? next(err) : res.json(user)));
      } else {
        const err = new Error('Incorrect email or password!');
        err.status = 401;
        next(err);
      }
    })
    .catch(next);
});

router.get('/me', (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else if (!req.session.userId) {
    console.log(req.session);
    userNotFound(next);
  } else {
    Users.findByPk(req.session.userId, { include: [{ model: Fridge }] })
      .then(user => (user ? res.json(user) : userNotFound(next)))
      .catch(next);
  }
});

router.delete('/logout', (req, res, next) => {
  req.logOut();
  req.session.destroy();
  res.status(204).end();
});

module.exports = router;
