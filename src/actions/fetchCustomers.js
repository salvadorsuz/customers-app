import { FETCH_CUSTOMERS } from './../constants';
import { createAction } from 'redux-actions';
import { apiGet } from './../api';
import { urlCustomers } from './../api/urls';

/*
const customers = [
    {"dni":"123", "name": "Pepe", "age": 30},
    {"dni":"456", "name": "Paco", "age": 31},
    {"dni":"789", "name": "Antonio", "age": 32},
    {"dni":"741", "name": "jose", "age": 33},
];
const fetchCustomers = () => ({ type: FETCH_CUSTOMERS, payload: customers });
*/
export const fetchCustomers = createAction(FETCH_CUSTOMERS, apiGet(urlCustomers));  