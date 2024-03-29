import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login, loginSuccess } from '../../../store/auth/action';
import axios from 'axios';
import { Form, Input, notification } from 'antd';
import { connect } from 'react-redux';
import { baseUrl, baseAuthUrl } from '../../../repositories/Repository';
class Login extends Component {
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

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }
        return false;
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }
    handleLoginSubmit = () => {
        axios
            .post(
                `${baseUrl}/${baseAuthUrl}/login`,
                {
                    emailid: this.state.username,
                    password: this.state.password,
                    googleid: '',
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
                    const responseData = res.data.ResponseData;
                    this.props.dispatch(
                        login(
                            responseData.ID,
                            responseData.Role,
                            responseData.Name,
                            responseData.Token,
                            responseData.ProfilePic,
                            responseData.EmailId
                        )
                    );
                    // this.props.dispatch(login());
                    this.props.dispatch(
                        loginSuccess(
                            responseData.ID,
                            responseData.Role,
                            responseData.Name,
                            responseData.Token,
                            responseData.ProfilePic,
                            responseData.EmailId
                        )
                    );
                    Router.push('/');
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseID === -1
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
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleLoginSubmit.bind(this)}>
                        <ul className="ps-tab-list">
                            <li className="active">
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Log In Your Account</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email or username!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="username"
                                            name="username"
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
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="remember-me"
                                            name="remember-me"
                                        />
                                        <label htmlFor="remember-me">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <Link href="/account/forgotpassword">
                                        <a style={{ fontSize: '15px' }}>
                                            Forgot Password?
                                        </a>
                                    </Link>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Login
                                    </button>
                                </div>
                            </div>
                            <div className="ps-form__footer">
                                <p>Connect with:</p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a
                                            className="facebook"
                                            href="#"
                                            onClick={(e) =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="google"
                                            href="#"
                                            onClick={(e) =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="twitter"
                                            href="#"
                                            onClick={(e) =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="instagram"
                                            href="#"
                                            onClick={(e) =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
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
export default connect(mapStateToProps)(Login);
