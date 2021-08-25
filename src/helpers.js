/* eslint-disable */
import * as actions from './actions/index';
import axios from 'axios';
import store from './index';

export const sendUserData = async (e, username, password) => {
  store.dispatch(actions.error(''));
  store.dispatch(actions.loading('Loading'));
  e.preventDefault();
  await fetch('https://pacific-mountain-97932.herokuapp.com/sessions', {
    method: 'post',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((res) => res.json()).then((res) => {
    if (res.message) {
      store.dispatch(actions.loading(''));
      store.dispatch(actions.error(res.message));
    }
    if (res.id) {
      store.dispatch(actions.login(res));
      store.dispatch(actions.error(''));
      store.dispatch(actions.loading(''));
    }
  });
};

export const createUser = async (e, username, password) => {
  store.dispatch(actions.error(''));
  store.dispatch(actions.loading('Loading'));
  e.preventDefault();
  await fetch('https://pacific-mountain-97932.herokuapp.com/users', {
    method: 'post',
    body: JSON.stringify({ username, password, password_confirmation: password }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((res) => res.json()).then((res) => {
    if (res.errors) {
      if (res.errors.username) {
        store.dispatch(actions.loading(''));
        store.dispatch(actions.error(res.errors.username[0]));
      } else if (res.errors.password) {
        store.dispatch(actions.loading(''));
        store.dispatch(actions.error(res.errors.password[0]));
      }
    }
    if (res.id) {
      store.dispatch(actions.login(res));
      store.dispatch(actions.error(''));
      store.dispatch(actions.loading(''));
      store.dispatch(actions.content(2));
    }
  });
};


export const getData = async (selectedId)=>{
      const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/users/${selectedId}`);
      const data = await res.data;
      // store.dispatch(actions.total(data.total))
      data.items.map((item) => (
        store.dispatch(actions.items(item))
      ));
} 


export const setTotal = async (selectedId)=>{
  const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/users/${selectedId}`);
  const data = await res.data;
  store.dispatch(actions.total(data.total))
} 




export  const sendExpenseData = async (expense , itemId) => {
  await fetch('https://pacific-mountain-97932.herokuapp.com/api/v1/expenses', {
    method: 'post',
    body: JSON.stringify({ expense: expense, item_id: itemId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
};


export const getExpenses = async(userId , itemName = '' )=>{
    const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/users/${userId}`);
    const userItems = await res.data.items;
    const expRes = await axios.get('https://pacific-mountain-97932.herokuapp.com/api/v1/expenses');
    const expData = await expRes.data;
    const selectedItem = await userItems.find((item) => item.name === itemName);
    store.dispatch(actions.itemId(selectedItem.id))
    const expArray = await expData.filter((exp) => exp.item_id === selectedItem.id);
    store.dispatch(actions.expenses(expArray))
    let sum = 0;
    expArray.forEach(exp => {
      sum = sum + exp.expense
    });
    store.dispatch(actions.total(sum))
};


export const removeItemById = (id)=>{
  fetch(`https://pacific-mountain-97932.herokuapp.com/api/v1/expenses/${id}`, {
    method: 'DELETE',
  });
}