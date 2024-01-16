export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
    REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
    CHECKOUT_INFO: 'CHECKOUT_INFO',
};

export function login() {
    return { type: actionTypes.LOGIN_REQUEST };
}

export function loginSuccess(loginId, role, name, token, selectimage, emailId) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            loginId: loginId,
            role: role,
            name: name,
            token: token,
            selectimage: selectimage,
            emailId: emailId,
        },
    };
}

export function logOut() {
    return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        payload: {
            loginId: null,
            role: null,
            name: null,
            token: null,
            selectimage: null,
            emailId: null,
        },
    };
}

export function registrationSuccess() {
    return { type: actionTypes.REGISTRATION_SUCCESS };
}

export function checkoutinfo(
    CustomerID,
    SubTotal,
    Total,
    Tax,
    Discount,
    Contact,
    ShippingCharge,
    ShippingFirstName,
    ShippingLastName,
    ShippingAddress,
    ShippingAddress2,
    ShippingCity,
    ShippingPostalCode
) {
    return {
        type: actionTypes.CHECKOUT_INFO,
        payload: {
            CustomerID: CustomerID,
            SubTotal: SubTotal,
            Total: Total,
            Tax: Tax,
            Discount: Discount,
            Contact: Contact,
            ShippingCharge: ShippingCharge,
            ShippingFirstName: ShippingFirstName,
            ShippingLastName: ShippingLastName,
            ShippingAddress: ShippingAddress,
            ShippingAddress2: ShippingAddress2,
            ShippingCity: ShippingCity,
            ShippingPostalCode: ShippingPostalCode,
        },
    };
}
