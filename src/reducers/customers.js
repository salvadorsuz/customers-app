import { handleActions } from 'redux-actions';
import { FETCH_CUSTOMERS, INSERT_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from './../constants';

export const customers = handleActions({
    [FETCH_CUSTOMERS]: (state, action) => [...action.payload],
    [INSERT_CUSTOMER]: (state, action) => action.error ? state : [...state, action.payload],
    [UPDATE_CUSTOMER]: (state, action) => {
        if(!action.error) {
            const customerPayload = action.payload;
            const customers = state;
            return customers.reduce((acc, customer) => {
                if(customer.id === customerPayload.id ) {
                    return [...acc, customerPayload ];
                }
                return [...acc, customer];
            }, [])
        }
        return state;
    },
    [DELETE_CUSTOMER]: (state, action) => {
        if(!action.error) {
            return state.filter(e => e.id !== action.payload);
        }
        return state;
    },
}, []);