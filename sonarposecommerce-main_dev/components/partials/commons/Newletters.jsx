import React, { useState } from 'react';
import {
    baseUrl,
    GeneralGetUrl,
    baseAuthUrl,
    baseGeneralUrl,
} from '../../../repositories/Repository';
import axios from 'axios';
import { Form, Input, notification } from 'antd';

const Newsletters = ({ layout }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            axios
                .post(`${GeneralGetUrl}/${baseGeneralUrl}/newsletter`, {
                    emailid: email,
                })
                .then((res) => {
                    notification.success({
                        message: 'Subscription successful',
                        description:
                            'Thank you for subscribing to our newsletter',
                    });
                    setEmail('');
                })
                .catch((error) => {
                    notification.error({
                        message: 'Subscription failed',
                        description: 'Please try again later',
                    });
                });
        } else {
            notification.warning({
                message: 'Email required',
                description: 'Please enter your email address to subscribe',
            });
        }
    };

    return (
        <section className="ps-newsletter">
            <div
                className={
                    layout && layout === 'container'
                        ? ' container'
                        : 'ps-container'
                }>
                <form className="ps-form--newsletter" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-form__left">
                                <h3>Newsletter</h3>
                                <p>
                                    Subscribe to get information about products
                                    and coupons
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-form__right">
                                <div className="form-group--nest">
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <button className="ps-btn" type="submit">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Newsletters;
