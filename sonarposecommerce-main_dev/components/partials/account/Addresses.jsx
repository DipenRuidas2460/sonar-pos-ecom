import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, baseAuthUrl } from '~/repositories/Repository';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Addresses = () => {
    const loginId = useSelector((state) => state.auth.loginId); // get the loginId from the Redux store
    const name = useSelector((state) => state.auth.name);
    const emailId = useSelector((state) => state.auth.emailId);
    const selectimage = useSelector((state) => state.auth.selectimage);
    const [billigData, setBillingData] = useState([]);
    const [shippingData, setShippingData] = useState([]);
    const accountLinks = [
        {
            text: 'Account Information',
            url: '/account/user-information',
            icon: 'icon-user',
        },
        {
            text: 'Notifications',
            url: '/account/notifications',
            icon: 'icon-alarm-ringing',
        },
        {
            text: 'Invoices',
            url: '/account/invoices',
            icon: 'icon-papers',
        },
        {
            text: 'Address',
            url: '/account/addresses',
            icon: 'icon-map-marker',
            active: true,
        },
        {
            text: 'Recent Viewed Product',
            url: '/account/recent-viewed-product',
            icon: 'icon-store',
        },
        {
            text: 'Wishlist',
            url: '/account/wishlist',
            icon: 'icon-heart',
        },
        {
            text: 'Change Password',
            url: '/account/change-password',
            icon: 'icon-lock',
        },
    ];

    //to get addreses of billing
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
                    setBillingData(res.data.ResponseData[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //to get shipping address
    useEffect(() => {
        axios
            .get(
                `${baseUrl}/${baseAuthUrl}/shippingaddressselectbyid?id=${loginId}`,
                {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            )
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    setShippingData(res.data.ResponseData[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src={selectimage} />
                                    <figure>
                                        <figcaption>{name}</figcaption>
                                        <p>{emailId}</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul>
                                        {accountLinks.map((link) => (
                                            <li
                                                key={link.text}
                                                className={
                                                    link.active ? 'active' : ''
                                                }>
                                                <Link href={link.url}>
                                                    <a>
                                                        <i
                                                            className={
                                                                link.icon
                                                            }></i>
                                                        {link.text}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <Link href="/account/my-account">
                                                <a>
                                                    <i className="icon-power-switch"></i>
                                                    Logout
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-section--account-setting">
                            <div className="ps-section__content">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <figure className="ps-block--address">
                                            <figcaption>
                                                Billing address
                                            </figcaption>
                                            <div className="ps-block__content">
                                                {billigData ? (
                                                    <>
                                                        <p>
                                                            {
                                                                billigData.Firstname
                                                            }
                                                            &nbsp;
                                                            {
                                                                billigData.Lastname
                                                            }
                                                            <br />
                                                            {
                                                                billigData.StreetAddress
                                                            }
                                                            <br />
                                                            {billigData.State}
                                                            <br />
                                                            {billigData.Country}
                                                            <br />
                                                            {
                                                                billigData.PostCode
                                                            }
                                                            <br />
                                                            {billigData.Email}
                                                            <br />
                                                        </p>
                                                        <Link href="/account/edit-address">
                                                            <a>Edit</a>
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p>
                                                            You Have Not Set Up
                                                            This Type Of Address
                                                            Yet.
                                                        </p>
                                                        <Link href="/account/edit-address">
                                                            <a>Add</a>
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </figure>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <figure className="ps-block--address">
                                            <figcaption>
                                                Shipping address
                                            </figcaption>
                                            <div className="ps-block__content">
                                                {shippingData ? (
                                                    <>
                                                        <p>
                                                            {
                                                                shippingData.Firstname
                                                            }
                                                            &nbsp;
                                                            {
                                                                shippingData.Lastname
                                                            }
                                                            <br />
                                                            {
                                                                shippingData.StreetAddress
                                                            }
                                                            <br />
                                                            {shippingData.State}
                                                            <br />
                                                            {
                                                                shippingData.Country
                                                            }
                                                            <br />
                                                            {
                                                                shippingData.PostCode
                                                            }
                                                            <br />
                                                            {shippingData.Email}
                                                            <br />
                                                        </p>
                                                        <Link href="/account/edit-shipping-address">
                                                            <a>Edit</a>
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p>
                                                            You Have Not Set Up
                                                            This Type Of Address
                                                            Yet.
                                                        </p>
                                                        <Link href="/account/edit-shipping-address">
                                                            <a>Add</a>
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Addresses;
