import Link from 'next/link';
import Router from 'next/router';
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseUrl, baseAuthUrl } from '../../../repositories/Repository';
import { Form, Input, notification } from 'antd';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null, // initialize userID to null
        };
    }
    // componentDidMount() {
    //     useEffect(() => {
    //     }, [router.query.id]);

    //     const router = useRouter();

    //     // const id = this.props.match.params.id;
    //     this.handleGetID(id);

    //     // const { router } = this.props;
    //     // const userID = router.query.id; // retrieve the userID parameter from the query string
    //     // this.setState({ userID }); // set the userID in the component state
    //     // this.handleGetID(); // call the post function on page refresh
    // }
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value,
        });
    };

    handleGetID = (id) => {
        // const { userID } = this.state; // retrieve the userID from the component state
        axios
            .post(
                `${baseUrl}/${baseAuthUrl}/resetpassword`,
                {
                    // id: paramObject.id,
                    id: id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            )
            .then((res) => {
                if (
                    res.data.ResponseCode === 'SUCCESS' &&
                    res.data.ResponseData[0].ID > 0
                ) {
                    // setConditionCheck(true);
                    // setCheckMessage(res.data.ResponseMessage);
                    // setUserID(res.data.ResponseData[0].ID);
                    // toastSuccess(SUCCESS_MESSAGE);
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseData[0].ID === -1
                ) {
                    // setCheckMessage(res.data.ResponseMessage);
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseData[0].ID === -2
                ) {
                    // setCheckMessage(res.data.ResponseMessage);
                }
            })
            .catch((error) => {
                console.log('error occurred', error);
            });
    };

    handleSubmit = (e) => {
        axios
            .post(
                `${baseUrl}/${baseAuthUrl}/updatepassword`,
                {
                    userid: userID,
                    password: this.state.password,
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
                        message: 'Password successfully Updated!',
                        description:
                            'You have successfully Updated Your Password.',
                    });
                    Router.push('/account/login');
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
                                <Link href="/account/resetpassword">
                                    <a>Reset Password</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Reset Your Password</h5>
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
                                            placeholder="New Password..."
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
export default connect(mapStateToProps)(ResetPassword);
