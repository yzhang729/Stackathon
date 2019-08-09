const router = require('express').Router();

router.use('/auth/users', require('./users'));
router.use('/recipes', require('./recipes'));

router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});
module.exports = router;
