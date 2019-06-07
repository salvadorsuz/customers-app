import { combineReducers} from 'redux';
import { customers } from './customers';
import { reducer as formReducer} from 'redux-form';
import { CUSTOMER_LIST, CUSTOMER_VIEW } from './../constants/permissions';

const user = (state, action) => (
    {
        permissions: [CUSTOMER_LIST,CUSTOMER_VIEW],
    }
);

export default combineReducers({
    customers,
    form: formReducer,
    user
});

