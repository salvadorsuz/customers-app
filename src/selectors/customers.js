import { createSelector } from 'reselect';

export const getCustomers = createSelector(state => state.customers, customers => customers);

export const getCustomerByDni = createSelector(
    (state, props) => state.customers.find(c => c.dni === props.dni), 
    customer => customer
);