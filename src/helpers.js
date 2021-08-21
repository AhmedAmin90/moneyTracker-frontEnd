/* eslint-disable import/no-cycle */
import * as actions from './actions/index';
import store from './index';

export const sendUserData = async (e, username, password) => {
  e.preventDefault();
  await fetch('https://pacific-mountain-97932.herokuapp.com/sessions', {
    method: 'post',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((res) => res.json()).then((res) => {
    if (res.message) {
      store.dispatch(actions.error(res.message));
    }
    if (res.id) {
      store.dispatch(actions.login(res));
      store.dispatch(actions.error(''));
    }
  });
};

export const createUser = async (e, username, password) => {
  e.preventDefault();
  await fetch('https://pacific-mountain-97932.herokuapp.com/users', {
    method: 'post',
    body: JSON.stringify({ username, password, password_confirmation: password }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((res) => res.json()).then((res) => {
    if (res.errors) {
      if (res.errors.username) {
        store.dispatch(actions.error(res.errors.username[0]));
      } else if (res.errors.password) {
        store.dispatch(actions.error(res.errors.password[0]));
      }
    }
    if (res.id) {
      store.dispatch(actions.login(res));
      store.dispatch(actions.error(''));
      store.dispatch(actions.content(2));
    }
  });
};
