import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../Constant/cartConstant";
import axios from "axios";

//Add to cart
export const addItemsToCart = (productId, quantity) => async (dispatch, getState) => {
    const CONFIG_OBJ = {
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    try {
        const { data } = await axios.get(`http://localhost:4000/product/${productId}`, CONFIG_OBJ);
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                pname: data.product.pname,
                price: data.product.price,
                image: data.product.image,
                quantity,
            },
        });

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.log("Error adding items to cart:", error);
        throw error;
    }
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async(dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//SHIPPING INFO
export const saveShippingInfo = (data) => async(dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });
    localStorage.setItem("shippingInfo",JSON.stringify(data));
};