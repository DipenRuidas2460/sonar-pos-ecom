import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, baseAuthUrl } from '~/repositories/Repository';
import { Form } from 'antd';
import { notification } from 'antd';
import Router from 'next/router';
import { useSelector } from 'react-redux';

const FormChangePassword = () => {
    const loginId = useSelector((state) => state.auth.loginId); // get the loginId from the Redux store
    const [formValues, setFormValues] = useState({
        Oldpassword: '',
        newpassword: '',
        confirmpassword: '',
    });

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    //to do change password activity
    const handleSubmit = () => {
        if (formValues.newpassword !== formValues.confirmpassword) {
            notification.error({
                message: 'Error',
                description:
                    'New password and confirm password must be the same.',
            });
            return;
        }

        let passwordUpdate = {
            ecomuserid: loginId,
            Oldpassword: formValues.Oldpassword,
            newpassword: formValues.newpassword,
        };

        axios
            .post(`${baseUrl}/${baseAuthUrl}/updatepassword`, passwordUpdate, {
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
                    Router.push('/');
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseMessage === 'Old Password Not Matched!'
                ) {
                    notification['error']({
                        message: 'ERROR!!!',
                        description: 'Old password does not match.',
                    });
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
    };

    return (
        <Form className="ps-form--change-password">
            <div className="ps-form__header">
                <h3>Change Password</h3>
            </div>
            <div className="ps-form__content">
                <div className="ps-section--change-password">
                    <div className="ps-section__content">
                        {/* Old Password */}
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label>Old Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter Old Password"
                                        className="form-control"
                                        name="Oldpassword"
                                        value={formValues.Oldpassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter New Password"
                                        className="form-control"
                                        name="newpassword"
                                        value={formValues.newpassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter Confirm Password"
                                        className="form-control"
                                        name="confirmpassword"
                                        value={formValues.confirmpassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="form-group submit">
                    <button className="ps-btn" onClick={handleSubmit}>
                        Change Password
                    </button>
                </div>
            </div>
        </Form>
    );
};

export default FormChangePassword;
