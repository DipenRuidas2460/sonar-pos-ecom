import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import axios from 'axios';
import { baseUrl, baseAuthUrl } from '../../../repositories/Repository';
import { Form, Input, notification } from 'antd';
import { connect } from 'react-redux';

class ForgotPassword extends Component {
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
        axios
            .post(
                `${baseUrl}/${baseAuthUrl}/forgotpassword`,
                {
                    emailid: this.state.email,
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
                        message: 'Mail successfully sent !',
                        description:
                            'A mail with the reset password link has been sent',
                    });

                    // this.props.dispatch(registrationSuccess());
                    // Router.push('/account/login');
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseID === -1
                ) {
                    notification['error']({
                        message: 'Invalid Email!!!',
                        description: 'The Mail Id You enter is incorrect!!!',
                    });
                } else {
                    notification['error']({
                        message: 'Opps!',
                        description: 'Something went wrong!',
                    });
                }
            })
            .catch((error) => {});
    };

    render() {
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleSubmit.bind(this)}>
                        <ul className="ps-tab-list">
                            <li className="active">
                                <Link href="/account/forgotpassword">
                                    <a>Forgot Password?</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Enter Your Email to verify</h5>
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
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Submit
                                    </button>
                                </div>
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
export default connect(mapStateToProps)(ForgotPassword);
