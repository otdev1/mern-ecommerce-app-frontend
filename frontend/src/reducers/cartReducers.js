import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
    /*in its initial state cartItems is an empty array to store objects,
      and shipping and payment are empty objects */
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            /*searches the object array x for a product(object) whose id matches the 
              id value of the product property of the item object*/
            if (product) {
                return { cartItems: state.cartItems.map(x => x.product === product.product ? item : x)
                };
            }
            return { cartItems: [...state.cartItems, item] }
            //...state.cartItems keeps previous state of cartItems
        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.product !== action.payload) }; 
        case CART_SAVE_SHIPPING:
            return { ...state, shipping: action.payload };
        case CART_SAVE_PAYMENT:
            return { ...state, payment: action.payload };
        default:
            return state;
    }
}

export { cartReducer }