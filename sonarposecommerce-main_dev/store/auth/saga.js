import { all, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import {
    actionTypes,
    loginSuccess,
    logOutSuccess,
    registrationSuccess,
    checkoutinfo,
} from './action';

const modalSuccess = (type) => {
    notification[type]({
        message: 'Welcome back',
        description: 'You are login successful!',
    });
};

const modalWarning = (type) => {
    notification[type]({
        message: 'Good bye!',
        description: 'Your account has been logged out!',
    });
};

const modalRegistration = (type) => {
    notification[type]({
        message: 'Welcome a board!',
        description: 'Your account has been registered successfully!',
    });
};

function* loginSaga() {
    try {
        yield put(loginSuccess());
        // modalSuccess('success');
    } catch (err) {
        console.log(err);
    }
}

function* logOutSaga() {
    try {
        yield put(logOutSuccess());
       //  modalWarning('warning');
    } catch (err) {
        console.log(err);
    }
}

function* registrationSaga() {
    try {
        yield put(registrationSuccess());
        modalRegistration('success');
    } catch (err) {
        console.log(err);
    }
}

function* checkoutinfoSaga() {
    try {
        yield put(checkoutinfo());
        modalRegistration('success');
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actionTypes.LOGIN_REQUEST, loginSaga),
        takeEvery(actionTypes.LOGOUT, logOutSaga),
        takeEvery(actionTypes.REGISTRATION_SUCCESS, registrationSaga),
        takeEvery(actionTypes.CHECKOUT_INFO, checkoutinfoSaga),
    ]);
}
