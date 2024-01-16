import { takeLatest, put } from 'redux-saga/effects';
import { SAVE_SHIPPING_DATA } from '~/store/checkout/action';

function* saveShippingData(action) {
    yield put({
        type: SAVE_SHIPPING_DATA,
        data: action.data,
    });
}

export function* watchSaveShippingData() {
    yield takeLatest(SAVE_SHIPPING_DATA, saveShippingData);
}
