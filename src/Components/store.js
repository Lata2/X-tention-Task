// store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 
import rootReducer from '../Components/Rootreducer'; // Adjust the path to your rootReducer

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Apply thunk middleware here
);

export default store;
