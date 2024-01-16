import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, baseAuthUrl } from '~/repositories/Repository';
import { Form, Input } from 'antd';
import Router from 'next/router';
import { notification } from 'antd';
import { useSelector } from 'react-redux';

const FormEditAddress = () => {
    const loginId = useSelector((state) => state.auth.loginId); // get the loginId from the Redux store
    const [formValues, setFormValues] = useState({
        id: 0,
        firstname: '',
        lastname: '',
        companyname: '',
        country: '',
        address: '',
        state: '',
        postcode: '',
        email: '',
        isdefault: false,
    });

    const handleChange = (event) => {
        const value =
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value;
        setFormValues({
            ...formValues,
            [event.target.name]: value,
        });
    };

    // to get the billing address information
    useEffect(() => {
        axios
            .get(
                `${baseUrl}/${baseAuthUrl}/billingaddressselectbyid?id=${loginId}`,
                {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            )
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    let Data = res.data.ResponseData[0];
                    const data = {
                        id: Data.ID,
                        userid: loginId,
                        firstname: Data.Firstname,
                        lastname: Data.Lastname,
                        companyname: Data.CompanyName,
                        country: Data.Country,
                        address: Data.StreetAddress,
                        state: Data.State,
                        postcode: Data.PostCode,
                        email: Data.Email,
                        isdefault: Data.IsDefault === 1 ? true : false,
                        loginuserid: loginId,
                    };
                    setFormValues(data);
                } else if (res.data.ResponseCode === 'ERROR') {
                    notification['error']({
                        message: 'ERROR!!!',
                        description: res.data.ResponseMessage,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // to upsert the billing address information
    const handleSubmit = () => {
        const data = {
            id: formValues.id,
            userid: loginId,
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            companyname: formValues.companyname,
            country: formValues.country,
            address: formValues.address,
            state: formValues.state,
            postcode: formValues.postcode,
            email: formValues.email,
            isdefault: formValues.isdefault ? 1 : 0,
            loginuserid: loginId,
        };

        if (formValues.id === 0) {
            // User is adding a new address
            axios
                .post(`${baseUrl}/${baseAuthUrl}/billingaddressupsert`, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then((res) => {
                    if (res.data.ResponseCode === 'SUCCESS') {
                        notification['success']({
                            message: 'SUCCESS!!!',
                            description: res.data.ResponseMessage,
                        });
                        Router.push('/account/addresses');
                    } else if (res.data.ResponseCode === 'ERROR') {
                        notification['error']({
                            message: 'ERROR!!!',
                            description: res.data.ResponseMessage,
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // User is updating an existing address
            axios
                .post(`${baseUrl}/${baseAuthUrl}/billingaddressupsert`, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then((res) => {
                    if (res.data.ResponseCode === 'SUCCESS') {
                        notification['success']({
                            message: 'SUCCESS!!!',
                            description: res.data.ResponseMessage,
                        });
                        Router.push('/account/addresses');
                    } else if (res.data.ResponseCode === 'ERROR') {
                        notification['error']({
                            message: 'ERROR!!!',
                            description: res.data.ResponseMessage,
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <Form
            className="ps-form--edit-address"
            onFinish={handleSubmit}
            initialValues={formValues}>
            <div className="ps-form__header">
                <h3>Billing address</h3>
            </div>
            <div className="ps-form__content">
                {/* Hidden Id */}
                <input
                    type="hidden"
                    name="id"
                    value={formValues.id}
                    onChange={handleChange}
                />

                {/* First Name */}
                <div className="form-group">
                    <Form.Item
                        label="First Name"
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}>
                        <Input
                            type="text"
                            placeholder=""
                            className="form-control"
                            name="firstname"
                            value={formValues.firstname}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>

                {/* Last Name */}
                <div className="form-group">
                    <Form.Item
                        label="Last Name"
                        name="lastname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}>
                        <Input
                            type="text"
                            placeholder=""
                            className="form-control"
                            name="lastname"
                            value={formValues.lastname}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>

                {/* Comapny Name */}
                <div className="form-group">
                    <Form.Item
                        label="Company Name"
                        name="companyname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your company name!',
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}>
                        <Input
                            type="text"
                            placeholder=""
                            className="form-control"
                            name="companyname"
                            value={formValues.companyname}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>

                {/* Country */}
                <div className="form-group">
                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your country!',
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}>
                        <Input
                            type="text"
                            placeholder=""
                            className="form-control"
                            name="country"
                            value={formValues.country}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>

                {/* Street Address */}
                <div className="form-group">
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your street address!',
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}>
                        <Input
                            type="text"
                            placeholder=""
                            className="form-control"
                            name="address"
                            value={formValues.address}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>

                {/* State */}
                <div className="form-group">
                    <Form.Item
                        label="State"
                        name="state"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your state!',
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}>
                        <Input
                            type="text"
                            placeholder=""
                            className="form-control"
                            name="state"
                            value={formValues.state}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>

                {/* Postcode */}
                <div className="form-group">
                    <Form.Item
                        label="PostCode"
                        name="postcode"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your postcode!',
                            },
                            {
                                pattern: /^\d{5,10}$/,
                                message:
                                    'Postcode must be a number between 5 and 10 digits long!',
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}>
                        <Input
                            type="text"
                            placeholder=""
                            className="form-control"
                            name="postcode"
                            value={formValues.postcode}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>

                {/* Email Address */}
                <div className="form-group">
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email address!',
                                pattern: new RegExp(
                                    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
                                ),
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}>
                        <Input
                            type="email"
                            placeholder=""
                            className="form-control"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>

                {/* Default Address */}
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            type="checkbox"
                            id="isdefault"
                            name="isdefault"
                            checked={formValues.isdefault}
                            onChange={handleChange}
                        />
                        <label htmlFor="isdefault">Default address</label>
                    </div>
                </div>

                <div className="form-group submit">
                    <button type="submit" className="ps-btn">
                        Save Address
                    </button>
                </div>
            </div>
        </Form>
    );
};

export default FormEditAddress;
