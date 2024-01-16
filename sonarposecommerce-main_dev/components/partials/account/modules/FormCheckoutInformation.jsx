import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, notification } from 'antd';
import {
    GeneralGetUrl,
    ProductGetUrl,
    baseGeneralUrl,
    baseProductUrl,
} from '~/repositories/Repository';
import axios from 'axios';
import shipping from '~/pages/account/shipping';
import Shipping from '~/components/partials/account/Shipping';
import { saveShippingData } from '~/store/checkout/action';
import { connect, useDispatch } from 'react-redux';
let dispatch;

class FormCheckoutInformation extends Component {
    // loginId = useSelector((state) => state.auth.loginId); // get the loginId from the Redux store
    loginId = 14;
    constructor(props) {
        super(props);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
        });
        console.log('this.state', this.state);
    };

    // componentDidMount() {
    //     const { shippingData } = this.props;
    //     if (shippingData) {
    //         this.setState({
    //             Contact: shippingData.Contact,
    //             ShippingFirstName: shippingData.ShippingFirstName,
    //             ShippingLastName: shippingData.ShippingLastName,
    //             ShippingAddress: shippingData.ShippingAddress,
    //             ShippingAddress2: shippingData.ShippingAddress2
    //                 ? shippingData.ShippingAddress2
    //                 : '',
    //             ShippingCity: shippingData.ShippingCity,
    //             ShippingPostalCode: shippingData.ShippingPostalCode,
    //             // ShippingState: shippingData.ShippingState,
    //             // ShippingCountry: shippingData.ShippingCountry,
    //     });
    //     }
    // }

    handleLoginSubmit = () => {
        // const data = {
        //     // id: 0,
        //     // CustomerID: loginId,
        //     CustomerID: 1,
        //     SubTotal: this.state.SubTotal,
        //     Total: this.state.Total,
        //     Tax: this.state.Total,
        //     Discount: this.state.Discount,
        //     Contact: this.state.Contact,
        //     ShippingCharge: this.state.ShippingCharge,
        //     ShippingFirstName: this.state.ShippingFirstName,
        //     ShippingLastName: this.state.ShippingLastName,
        //     ShippingAddress: this.state.ShippingAddress,
        //     ShippingAddress2: this.state.ShippingAddress2,
        //     ShippingCity: this.state.ShippingCity,
        //     ShippingPostalCode: this.state.ShippingPostalCode,
        // };
        const data = {
            // id: 0,
            // CustomerID: loginId,
            CustomerID: 1,
            // SubTotal: this.state.SubTotal,
            // Total: this.state.Total,
            // Tax: this.state.Total,
            // Discount: this.state.Discount,
            Contact: this.state.Contact,
            // ShippingCharge: this.state.ShippingCharge,
            ShippingFirstName: this.state.ShippingFirstName,
            ShippingLastName: this.state.ShippingLastName,
            ShippingAddress: this.state.ShippingAddress,
            ShippingAddress2: this.state.ShippingAddress2,
            ShippingCity: this.state.ShippingCity,
            ShippingPostalCode: this.state.ShippingPostalCode,
        };
        this.props.dispatch(saveShippingData(data));
        // dispatch(saveShippingData(data));
        //     axios
        //         .post(`${GeneralGetUrl}/${baseGeneralUrl}/ordersinsert`, data, {
        //             headers: {
        //                 'Content-Type': 'application/json;charset=UTF-8',
        //                 'Access-Control-Allow-Origin': '*',
        //             },
        //         })
        //         .then((res) => {
        //             if (res.data.ResponseCode === 'SUCCESS') {
        //                 notification['success']({
        //                     message: 'Checkout Information Submitted!',
        //                     description: 'Checkout Information Submitted!',
        //                 });
        //                 // this.props.dispatch(registrationSuccess());
        //                 // Router.push('/account/login');
        //             } else if (
        //                 res.data.ResponseCode === 'ERROR' &&
        //                 res.data.ResponseID === -1
        //             ) {
        //                 notification['error']({
        //                     message: 'ERROR!!!',
        //                     description: res.data.ResponseMessage,
        //                 });
        //             } else if (
        //                 res.data.ResponseCode === 'ERROR' &&
        //                 res.data.ResponseID === -3
        //             ) {
        //                 notification['error']({
        //                     message: 'ERROR!!!',
        //                     description: res.data.ResponseMessage,
        //                 });
        //             }
        //         })
        //         .catch((error) => {});
        Router.push('/account/shipping');
    };

    render() {
        const { shippingData } = this.props;
        // console.log('shippingData::>>>', shippingData);
        return (
            <Form
                className="ps-form__billing-info"
                onFinish={this.handleLoginSubmit.bind(this)}>
                <h3 className="ps-form__heading">Contact information</h3>
                <div className="form-group">
                    <Form.Item
                        name="Contact"
                        rules={[
                            {
                                required: false,
                                message:
                                    'Enter an email or mobile phone number!',
                            },
                        ]}>
                        <Input
                            className="form-control"
                            name="Contact"
                            type="text"
                            placeholder="Email or phone number"
                            onChange={this.handleInputChange}
                            value={
                                this.state?.Contact ? this.state.Contact : ''
                            }
                        />
                    </Form.Item>
                </div>
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="keep-update"
                        />
                        <label htmlFor="keep-update">
                            Keep me up to date on news and exclusive offers?
                        </label>
                    </div>
                </div>
                <h3 className="ps-form__heading">Shipping address</h3>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="ShippingFirstName"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Enter your first name!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    name="ShippingFirstName"
                                    type="text"
                                    placeholder="First Name"
                                    onChange={this.handleInputChange}
                                    value={
                                        this.state?.ShippingFirstName
                                            ? this.state.ShippingFirstName
                                            : ''
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="ShippingLastName"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Enter your last name!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    name="ShippingLastName"
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={this.handleInputChange}
                                    value={this.state?.ShippingLastName}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <Form.Item
                        name="ShippingAddress"
                        rules={[
                            {
                                required: false,
                                message: 'Enter an address!',
                            },
                        ]}>
                        <Input
                            className="form-control"
                            type="text"
                            name="ShippingAddress"
                            placeholder="Address"
                            onChange={this.handleInputChange}
                            value={this.state?.ShippingAddress}
                        />
                    </Form.Item>
                </div>
                <div className="form-group">
                    <Form.Item
                        name="ShippingAddress2"
                        rules={[
                            {
                                required: false,
                                message: 'Enter an Apartment!',
                            },
                        ]}>
                        <Input
                            className="form-control"
                            type="text"
                            name="ShippingAddress2"
                            placeholder="Apartment, suite, etc. (optional)"
                            onChange={this.handleInputChange}
                            value={this.state?.ShippingAddress2}
                        />
                    </Form.Item>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="ShippingCity"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Enter a city!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="city"
                                    placeholder="City"
                                    name="ShippingCity"
                                    onChange={this.handleInputChange}
                                    value={this.state?.ShippingCity}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="ShippingPostalCode"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Enter a postal code!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="postalCode"
                                    name="ShippingPostalCode"
                                    placeholder="Postal Code"
                                    onChange={this.handleInputChange}
                                    value={this.state?.ShippingPostalCode}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="save-information"
                        />
                        <label htmlFor="save-information">
                            Save this information for next time
                        </label>
                    </div>
                </div>
                <div className="ps-form__submit">
                    <Link href="/account/shopping-cart">
                        <a>
                            <i className="icon-arrow-left mr-2"></i>
                            Return to shopping cart
                        </a>
                    </Link>
                    <div className="ps-block__footer">
                        <button className="ps-btn">Continue to shipping</button>
                    </div>
                </div>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    shippingData: state.shippingReducer?.shippingData,
});

export default connect(mapStateToProps)(FormCheckoutInformation);
// export default FormCheckoutInformation;
