import { actionTypes, loginSuccess, checkoutinfo } from './action';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'isLoggedIn';
const COOKIE_EXPIRATION_TIME = 10; // In minutes

export const initState = {
    // isLoggedIn: false,
    isLoggedIn: Cookies.get(COOKIE_NAME) === 'true',
    // isLoggedIn: Cookies.get(COOKIE_NAME),
    loginId: null,
    role: null,
    name: null,
    token: null,
    selectimage: null,
    emailId: null,
    CustomerID: null,
    SubTotal: null,
    Total: null,
    Tax: null,
    Discount: null,
    Contact: null,
    ShippingCharge: null,
    ShippingFirstName: null,
    ShippingLastName: null,
    ShippingAddress: null,
    ShippingAddress2: null,
    ShippingCity: null,
    ShippingPostalCode: null,
};

function reducer(state = initState, action) {
    // console.log('action', action);
    // console.log('state', state);
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            Cookies.set(COOKIE_NAME, 'true', {
                expires: COOKIE_EXPIRATION_TIME / (24 * 60),
            });
            // localStorage.setItem('isLoggedIn', 'true');
            // Cookies.set('isLoggedIn', 'true');
            return {
                ...state,
                loginId: action.payload.loginId,
                role: action.payload.role,
                name: action.payload.name,
                token: action.payload.token,
                selectimage: action.payload.selectimage,
                emailId: action.payload.emailId,
                isLoggedIn: true,
            };
        case actionTypes.LOGOUT_SUCCESS:
            // Cookies.remove(COOKIE_NAME);
            // localStorage.setItem('isLoggedIn', 'false');
            Cookies.remove(COOKIE_NAME);
            return {
                ...state,
                loginId: action.payload.loginId,
                role: action.payload.role,
                name: action.payload.name,
                token: action.payload.token,
                selectimage: action.payload.selectimage,
                emailId: action.payload.emailId,
                isLoggedIn: false,
            };

        case actionTypes.CHECKOUT_INFO:
            return {
                ...state,
                CustomerID: action.payload.CustomerID,
                SubTotal: action.payload.SubTotal,
                Total: action.payload.Total,
                Tax: action.payload.Tax,
                Discount: action.payload.Discount,
                Contact: action.payload.Contact,
                ShippingCharge: action.payload.ShippingCharge,
                ShippingFirstName: action.payload.ShippingFirstName,
                ShippingLastName: action.payload.ShippingLastName,
                ShippingAddress: action.payload.ShippingAddress,
                ShippingAddress2: action.payload.ShippingAddress2,
                ShippingCity: action.payload.ShippingCity,
                ShippingPostalCode: action.payload.ShippingPostalCode,
            };
        default:
            return state;
    }
}

// Set a timer to clear the cookie when there's no activity for 10 minutes
// let timeoutId;
// function resetLogoutTimer() {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//         Cookies.remove(COOKIE_NAME);
//     }, COOKIE_EXPIRATION_TIME * 60 * 1000);
// }

// // Reset the timer whenever there's user activity
// window.addEventListener('mousemove', resetLogoutTimer);
// window.addEventListener('keypress', resetLogoutTimer);

export default reducer;
