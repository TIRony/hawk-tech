import { cartConstants } from "../actions/constants";

const initState = {
    cartItems: {
        // 123: {
        //     _id: 123,
        //     name: 'Samsung mobile',
        //     img: 'some.jpg',
        //     price: 200,
        //     qty: 1,
        // }
    },
    updatingCart: false,
    error: null,
    loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case cartConstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingCart: true
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
            break;
        case cartConstants.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break;
        case cartConstants.REMOVE_CART_ITEM_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case cartConstants.REMOVE_CART_ITEM_SUCCESS:
            state = {
                ...state,
                loading: true,
            }
            break;
        case cartConstants.REMOVE_CART_ITEM_FAILURE:
            state = {
                ...state,
                loading: false,
            }
            break;
        case cartConstants.RESET_CART:
            state = {
                ...initState
            }
            break;
        default:
    }
    return state;
}