import { SAVE_SHIPPING_DATA } from '~/store/checkout/action';

const initialState = {
    shippingData: null,
};

const shippingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_SHIPPING_DATA:
            return {
                ...state,
                shippingData: action.data,
            };
        default:
            return state;
    }
};

export default shippingReducer;
