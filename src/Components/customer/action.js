import { message } from 'antd';
import { 
    saveCustomerAPI, 
    getCustomersAPI, 
    deleteCustomerAPI 
} from '../../API/CoreApi';
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

export const addCustomer = (data) => async (dispatch) => {
    dispatch({ type: SAVE_CUSTOMERS_REQUEST });
    try {
        const response = await saveCustomerAPI(data);
        dispatch({ type: SAVE_CUSTOMERS_SUCCESS, payload: response });
        message.success('Customer added successfully');
    } catch (error) {
        dispatch({ type: SAVE_CUSTOMERS_FAILURE, payload: error.message || 'An error occurred' });
        message.error('Failed to add customer: ' + (error.response?.data?.message || error.message));
    }
};

export const fetchCustomers = () => async (dispatch) => {
    dispatch({ type: GET_CUSTOMERS_REQUEST });
    try {
        const response = await getCustomersAPI();
        dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_CUSTOMERS_FAILURE, payload: error.message || 'An error occurred' });
        message.error('Failed to fetch customers: ' + (error.response?.data?.message || error.message));
    }
};

export const deleteCustomer = (id) => async (dispatch) => {
    dispatch({ type: DELETE_CUSTOMER_REQUEST });
    try {
        await deleteCustomerAPI(id);
        dispatch({ type: DELETE_CUSTOMER_SUCCESS, payload: id });
        message.success('Customer deleted successfully');
    } catch (error) {
        dispatch({ type: DELETE_CUSTOMER_FAILURE, payload: error.message || 'An error occurred' });
        message.error('Failed to delete customer: ' + (error.response?.data?.message || error.message));
    }
};
