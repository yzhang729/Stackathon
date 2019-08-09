const router = require('express').Router();
const axios = require('axios');

const recipeNotFound = next => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};

const getRecipes = async function() {
  const allRecipes = await axios.get(
    'https://api.spoonacular.com/recipes/findByIngredients?apiKey=99e97576e6mshfbca1fff3670aaep13399cjsn6c46320424c4',
    {
      params: {
        limit: 50,
        offset: i,
      },
    }
  );
};

module.exports = router;
