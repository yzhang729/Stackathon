const router = require('express').Router();
const { db, Users, Fridge } = require('../db/index');

const fridgeNotFound = next => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};

router.post('/', async (req, res, next) => {
  try {
    Fridge.create({
      food: req.body.food,
      userId: req.session.passport.user.id,
    }).then(async newFridge => {
      const returnUser = await Users.findByPk(newFridge.userId, {
        include: [{ model: Fridge }],
      });
      res.json(returnUser);
    });
  } catch (err) {
    res.send('food could not be created');
    console.log('an error has occurred');
  }
});

module.exports = router;
