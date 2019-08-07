import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialUser = {};

const GET_USER = 'GET_USER';

const gotMe = user => ({
  type: GET_USER,
  user,
});

export const getMe = () => dispatch => {
  return axios
    .get('/api/auth/users/me')
    .then(res => res.data)
    .then(user => dispatch(gotMe(user)))
    .catch(console.error.bind(console));
};

export const createUser = user => {
  return async dispatch => {
    const { data } = await axios.post('/api/auth/users/create', user);
    dispatch(gotMe(data));
  };
};

export const login = formData => dispatch => {
  return axios
    .put('/api/auth/users/login', formData)
    .then(res => res.data)
    .then(user => dispatch(gotMe(user)))
    .catch(console.error.bind(console));
};

export const logout = () => dispatch => {
  return axios
    .delete('/api/auth/users/logout')
    .then(() => dispatch(gotMe(initialUser)))
    .catch(console.error.bind(console));
};

const reducer = (state = initialUser, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
