import { handleActions } from 'redux-actions';
import { FETCH_CUSTOMERS, INSERT_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from './../constants';

export const customers = handleActions({
    [FETCH_CUSTOMERS]: (state, action) => [...action.payload],
    [INSERT_CUSTOMER]: (state, action) => [...state, action.payload],
    [UPDATE_CUSTOMER]: (state, action) => {
        const customerPayload = action.payload;
        const customers = state;

        return customers.reduce((acc, customer) => {
            if(customer.id === customerPayload.id ) {
                return [...acc, customerPayload ];
            }
            return [...acc, customer];
        }, [])
    },
    [DELETE_CUSTOMER]: (state, action) => state.filter(e => e.id !== action.payload),
}, []);