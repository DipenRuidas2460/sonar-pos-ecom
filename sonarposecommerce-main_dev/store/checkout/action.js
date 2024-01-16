export const SAVE_SHIPPING_DATA = 'SAVE_SHIPPING_DATA';

export const saveShippingData = (data) => {
    return {
        type: SAVE_SHIPPING_DATA,
        data,
    };
};
