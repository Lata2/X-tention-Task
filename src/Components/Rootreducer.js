import { combineReducers } from 'redux';
// Uncomment and import when needed
// import authReducer from '../component/globalFiles/authentication/authReducer';
import customerReducer from './customer/customerReducer';

const rootReducer = combineReducers({
    // Uncomment when you have the authReducer ready
    // emailVarifies: authReducer,
    customers: customerReducer,
});

export default rootReducer;
