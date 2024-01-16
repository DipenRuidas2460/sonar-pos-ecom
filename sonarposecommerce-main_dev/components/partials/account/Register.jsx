import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login, registrationSuccess } from '../../../store/auth/action';
import { Form, Input, notification } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

import { baseUrl, baseAuthUrl } from '../../../repositories/Repository';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        // this.props.dispatch(registrationSuccess());

        axios
            .post(
                `${baseUrl}/${baseAuthUrl}/registration`,
                // `http://localhost:4000/api/v1/ecomusers/registration`,
                {
                    id: 0,
                    username: this.state.username,
                    emailid: this.state.email,
                    password: this.state.password,
                    googleid: '',
                    phonenumber: this.state.phone,
                },
                {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            )
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    notification['success']({
                        message: 'Registration successful!',
                        description:
                            'You have successfully registered for an account.',
                    });

                    // this.props.dispatch(registrationSuccess());
                    Router.push('/account/login');
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
                    res.data.ResponseID === -3
                ) {
                    notification['error']({
                        message: 'ERROR!!!',
                        description: res.data.ResponseMessage,
                    });
                }
            })
            .catch((error) => {});
    };

    render() {
        return (
            <div className="ps-my-account mb-5">
                <div className="container mb-5">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleSubmit.bind(this)}>
                        <ul className="ps-tab-list">
                            <li>
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li className="active">
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Register An Account</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            placeholder="Email address"
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your password!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            placeholder="Password..."
                                            value={this.state.password}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="confirmpassword"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please confirm your password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (
                                                        !value ||
                                                        getFieldValue(
                                                            'password'
                                                        ) === value
                                                    ) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        new Error(
                                                            'The two passwords do not match.'
                                                        )
                                                    );
                                                },
                                            }),
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            name="confirmpassword"
                                            placeholder="confirm password..."
                                            value={this.state.confirmpassword}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your username!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.handleInputChange}
                                            placeholder="username"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your Phone Number!',
                                            },
                                            {
                                                max: 10,
                                                message:
                                                    'Phone number cannot exceed 10 digits!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="number"
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.handleInputChange}
                                            placeholder="Phone Number"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Register
                                    </button>
                                </div>
                            </div>
                            <div className="ps-form__footer">
                                <p>Connect with:</p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a className="facebook" href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="google" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="twitter" href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="instagram" href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );

        
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};
export default connect(mapStateToProps)(Register);
