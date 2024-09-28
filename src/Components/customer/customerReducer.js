import { json } from 'react-router-dom';
import {
    SAVE_CUSTOMERS_REQUEST,
    SAVE_CUSTOMERS_SUCCESS,
    SAVE_CUSTOMERS_FAILURE,

    GET_CUSTOMERS_REQUEST,
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_FAILURE,

    DELETE_CUSTOMER_REQUEST,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAILURE
} from './actionTypes';

const initialState = {
    loading: false,
    error: null,
    customers: [], // Store the list of customers here
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_CUSTOMERS_REQUEST:
        case GET_CUSTOMERS_REQUEST:
        case DELETE_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case SAVE_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: [...state.customers, action.payload], // Update customer list
            };

        case GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: action.payload, // Set customers from the response
            };

        case DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: state.customers.filter(customer => customer.id !== action.payload), // Remove customer from list
            };

        case SAVE_CUSTOMERS_FAILURE:
        case GET_CUSTOMERS_FAILURE:
        case DELETE_CUSTOMER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default customerReducer;
