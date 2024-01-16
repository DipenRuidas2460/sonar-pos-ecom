import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { baseProductUrl, ProductGetUrl } from '~/repositories/Repository';
import { useSelector } from 'react-redux';

const RecentViewedProducts = () => {
    const loginId = useSelector((state) => state.auth.loginId); // get the loginId from the Redux store
    const name = useSelector((state) => state.auth.name);
    const emailId = useSelector((state) => state.auth.emailId);
    const selectimage = useSelector((state) => state.auth.selectimage);
    const [responseData, setResponseData] = useState([]);
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
        },
        {
            text: 'Recent Viewed Product',
            url: '/account/recent-viewed-product',
            active: true,
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

    useEffect(() => {
        axios
            .get(
                `${ProductGetUrl}/${baseProductUrl}/recentviewproductlisting?customerid=${loginId}`,
                {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            )
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    setResponseData(res.data.ResponseData);
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
                        <section className="ps-section--account-setting">
                            <div className="ps-section__content">
                                <p>
                                    <strong>Recent View Product</strong>
                                </p>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <strong>
                                                        Product Name
                                                    </strong>
                                                </th>
                                                <th>
                                                    <strong>Image</strong>
                                                </th>
                                                <th>
                                                    <strong>Price</strong>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {responseData?.map(
                                                (item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <strong>
                                                                    {item.Name}
                                                                </strong>
                                                            </td>
                                                            <td>
                                                                {item.Image !=
                                                                    '' &&
                                                                item.Image !=
                                                                    undefined ? (
                                                                    <>
                                                                        <a
                                                                            href={
                                                                                item.Image
                                                                            }
                                                                            target="_blank">
                                                                            <img
                                                                                src={
                                                                                    item.Image
                                                                                }
                                                                                style={{
                                                                                    width:
                                                                                        '50px',
                                                                                    height:
                                                                                        '50px',
                                                                                    borderRadius:
                                                                                        '10px',
                                                                                }}
                                                                            />
                                                                        </a>
                                                                    </>
                                                                ) : (
                                                                    <a
                                                                        href={
                                                                            '/static/img/SonarPOS.png'
                                                                        }
                                                                        target="_blank">
                                                                        <img
                                                                            src="/static/img/SonarPOS.png"
                                                                            style={{
                                                                                width:
                                                                                    '50px',
                                                                                height:
                                                                                    '50px',
                                                                            }}
                                                                        />
                                                                    </a>
                                                                )}
                                                            </td>

                                                            <td>
                                                                $
                                                                {Number(
                                                                    item.Costprice
                                                                ).toFixed(2)}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecentViewedProducts;
