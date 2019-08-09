import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const suggestedRecipes = {};

const GET_RECIPES = 'GET_RECIPES';

const gotRecipes = data => ({
  type: GET_RECIPES,
  data,
});

export const getRecipes = fridge => async dispatch => {
  const { data } = await axios.get(
    'https://api.spoonacular.com/recipes/findByIngredients?apiKey=99e97576e6mshfbca1fff3670aaep13399cjsn6c46320424c4',
    {
      params: {
        ingredients: fridge.join(','),
        ignorePantry: true,
        ranking: 1,
        limitLicense: true,
      },
    }
  );
  dispatch(gotRecipes(data));
  console.log(data);
};

const reducer = (state = suggestedRecipes, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        suggestedRecipes: action.data,
      };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
