import React, { useEffect } from 'react';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { Form, Input, notification } from 'antd';
import axios from 'axios';
import {
    ProductGetUrl,
    baseProductUrl,
    GeneralGetUrl,
    baseGeneralUrl,
} from '~/repositories/Repository';
import { useDispatch } from 'react-redux';
import { saveShippingData } from '~/store/checkout/action';
// import { useSelector } from 'react-redux';

const ModulePaymentOrderSummary = ({ ecomerce, shipping }) => {
    const { products, setProducts, getProducts } = useEcomerce();
    // const loginId = useSelector((state) => state.auth.loginId); // get the loginId from the Redux store
    const loginId = 14;
    const dispatch = useDispatch();
    const shippingData = useSelector(
        (state) => state.shippingReducer?.shippingData
    );

    const amountt = useSelector((state) => state.shippingReducer?.amount1);

    // console.log(
    //     'amountttt::>>',
    //     useSelector((state) => state.shippingReducer?.amountt)
    // );

    useEffect(() => {
        // if (ecomerce.cartItems) {
        //     getProducts(ecomerce.cartItems, 'cart');
        // }
        axios
            .get(
                `${ProductGetUrl}/${baseProductUrl}/cartitemlisting?CustomerID=${
                    loginId > 0 ? loginId : 0
                }`
            )
            .then((response) => {
                if (response.data && response.data.ResponseData.length > 0) {
                    console.log(
                        'response.data.ResponseData:>:>:>:>:>',
                        response.data.ResponseData
                    );
                    setProducts(response.data.ResponseData);
                }
            })
            .catch(() => {
                return null;
            });
    }, []);

    // console.log('Shipppinngggg Dataaaaa::>>', shippingData);
    // view
    let listItemsView, shippingView, totalView;
    let amount;
    let shippingfee;
    let total;
    let amount2;
    let completetotal;
    if (products && products.length > 0) {
        amount = calculateAmount(products);
        amount2 = calculateAmount(products);
        shippingfee = 20.0;
        total = parseFloat(amount) + 20;
        completetotal = `${total}` + '.00';
        listItemsView = products.map((item) => (
            <Link href="/" key={item.ID}>
                <a>
                    <strong>
                        {item.ItemName}
                        <span>x{item.quantity}</span>
                    </strong>
                    <small>${item.quantity * item.price}</small>
                </a>
            </Link>
        ));
    } else {
        listItemsView = <p>No Product.</p>;
    }
    if (shipping === true) {
        console.log('ProductDataifProductistrueee::>>', products);
        console.log('shippingDataifshippingtrue::>>>', shippingData);
        if (
            shippingData != undefined &&
            shippingData != null &&
            shippingData != ''
        ) {
            // Xml for xmlecommerceitems
            let WorkOrderItemData = products?.filter(function (workOrderItem) {
                return workOrderItem.ItemID != '';
            });
            const workOrderItemobj = {};
            workOrderItemobj.xmlecommereceitems = WorkOrderItemData;
            let workorderitemjsonstring = JSON.stringify(workOrderItemobj);
            console.log('workorderitemjsonstring: ', workorderitemjsonstring);

            // Obj to send in axios call
            const data = {
                // CustomerID: loginId,
                CustomerID: 14,
                Contact: shippingData.Contact,
                ShippingCharge: shippingData.ShippingCharge,
                ShippingFirstName: shippingData.ShippingFirstName,
                ShippingLastName: shippingData.ShippingLastName,
                ShippingAddress: shippingData.ShippingAddress,
                ShippingAddress2: shippingData.ShippingAddress2,
                ShippingCity: shippingData.ShippingCity,
                ShippingPostalCode: shippingData.ShippingPostalCode,
                xmlecommereceitems: workorderitemjsonstring,
            };

            //Axios Call
            axios
                .post(`${GeneralGetUrl}/${baseGeneralUrl}/ordersinsert`, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then((res) => {
                    if (res.data.ResponseCode === 'SUCCESS') {
                        console.log(1);
                        notification['success']({
                            message: 'Checkout Information Submitted!',
                            description: 'Checkout Information Submitted!',
                        });
                        // this.props.dispatch(registrationSuccess());
                        // Router.push('/account/login');
                    } else if (
                        res.data.ResponseCode === 'ERROR' &&
                        res.data.ResponseID === -1
                    ) {
                        notification['error']({
                            message: 'ERROR!!!',
                            description: res.data.ResponseMessage,
                        });
                    } else if (
                        res.data.ResponseCode === 'ERROR' &&
                        res.data.ResponseID === -2
                    ) {
                        notification['error']({
                            message: 'ERROR!!!',
                            description: res.data.ResponseMessage,
                        });
                    }
                })
                .catch((error) => {});
        }
        // let WorkOrderItemData = allData.filter(function (workOrderItem) {
        //     return workOrderItem.ItemId != '';
        // });
        // const workOrderItemobj = {};
        // workOrderItemobj.workorderitemxml = WorkOrderItemData;
        // let workorderitemjsonstring = JSON.stringify(workOrderItemobj);
        // console.log('workorderitemjsonstring: ', workorderitemjsonstring);
        // const obj = {
        //     Contact: shippingData.Contact,
        //     CustomerID: shippingData.CustomerID,
        //     ShippingAddress: shippingData.ShippingAddress,
        //     ShippingAddress2: shippingData.ShippingAddress2,
        //     ShippingCity: shippingData.ShippingCity,
        //     ShippingFirstName: shippingData.ShippingFirstName,
        //     ShippingLastName: shippingData.ShippingLastName,
        //     ShippingPostalCode: shippingData.ShippingPostalCode,
        // };
        shippingView = (
            <figure>
                <figcaption>
                    <strong>Shipping Fee</strong>
                    <small>$20.00</small>
                </figcaption>
            </figure>
        );
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>${parseInt(amount) + 20}.00</strong>
                </h3>
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>${parseInt(amount)}.00</strong>
                </h3>
            </figure>
        );
    }
    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>${amount}</small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
            </div>
        </div>
    );
};
export default connect((state) => state)(ModulePaymentOrderSummary);
