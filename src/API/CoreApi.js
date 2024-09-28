import axios from 'axios';

const API_URL = 'http://localhost:3000/customers';

export const getCustomersAPI = () => axios.get(API_URL);
export const saveCustomerAPI = (data) => axios.post(API_URL, data);
export const deleteCustomerAPI = (id) => axios.delete(`${API_URL}/${id}`);











// import { message } from 'antd';
// import API from './API';

// /**
//  * To delete customer
//  */
// export const deleteCustomerAPI = async (id) => {
//     const tenantName = localStorage.getItem("tenant");
//     const token = localStorage.getItem("token");
    
//     try {
//         const response = await API.delete(`api/v1/${tenantName}/customerApp/customers/${id}/`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': `Bearer ${token}` // Uncomment if token is needed
//             },
//         });
//         return response.data;
//     } catch (error) {
//         message.error('Customer detail deletion failed.');
//         return Promise.reject(error); // Propagate the error
//     }
// };

// /**
//  * End of deleting customer
//  */

// /**
//  * To save the customer detail
//  */
// export const saveCustomerAPI = async (formData) => {
//     const tenantName = localStorage.getItem("tenant");
//     const token = localStorage.getItem("token");

//     try {
//         const response = await API.post(
//             `api/v1/${tenantName}/customerApp/customers/`,
//             formData,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // 'Authorization': `Bearer ${token}` // Uncomment if token is needed
//                 }
//             }
//         );
//         return response.data;
//     } catch (error) {
//         message.error('Customer detail saving failed.');
//         return Promise.reject(error); // Propagate the error
//     }
// };

// /**
//  * End of saving customer
//  */

// /**
//  * To get customer list
//  */
// export const getCustomersAPI = async (data) => {
//     const tenantName = localStorage.getItem("tenant");
//     const token = localStorage.getItem("token");

//     try {
//         const response = await API.get(
//             `api/v1/${tenantName}/customerApp/customers/`,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // 'Authorization': `Bearer ${token}` // Uncomment if token is needed
//                 },
//                 params: data
//             }
//         );
//         return response.data;
//     } catch (error) {
//         message.error('Customer detail fetching failed.');
//         return Promise.reject(error); // Propagate the error
//     }
// };

// /**
//  * End of getting customer list
//  */
