import {configureStore} from '@reduxjs/toolkit';
import {UserReducer} from './UserReducer';
import { cartReducer } from './cartReducer';


let initialState = {
    cart : {
        cartItems : localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem("cartItems")) 
        : [],
        shippingInfo: localStorage.getItem("shippingInfo") 
        ? JSON.parse(localStorage.getItem("shippingInfo")) 
        : {},
    },
};

export const store = configureStore({
    reducer : {
        user : UserReducer,
        cart : cartReducer
    },
    initialState,
});

