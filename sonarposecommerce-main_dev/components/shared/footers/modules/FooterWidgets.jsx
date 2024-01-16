import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
    baseUrl,
    baseAuthUrl,
    GeneralGetUrl,
    baseGeneralUrl,
} from '../../../../repositories/Repository';

const FooterWidgets = () => {
    const [Contact, setContact] = useState('');
    const [Address, setAddress] = useState('');
    const [Facebook, setFacebook] = useState('');
    const [Twitter, setTwitter] = useState('');
    const [Instagram, setInstagram] = useState('');
    const [Google, setGoogle] = useState('');
    const [Mail, setMail] = useState('');
    useEffect(() => {
        axios
            .get(`${GeneralGetUrl}/${baseGeneralUrl}/contactusselect`)
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    setAddress(
                        res.data.ResponseData[0].CommonConfigValue || ''
                    );
                    setMail(res.data.ResponseData[1].CommonConfigValue || '');
                    setFacebook(
                        res.data.ResponseData[2].CommonConfigValue || ''
                    );
                    setGoogle(res.data.ResponseData[3].CommonConfigValue || '');
                    setInstagram(
                        res.data.ResponseData[4].CommonConfigValue || ''
                    );
                    setContact(
                        res.data.ResponseData[5].CommonConfigValue || ''
                    );
                    setTwitter(
                        res.data.ResponseData[6].CommonConfigValue || ''
                    );
                }
            })
            .catch((error) => {
                console.log('error occurred', error);
            });
    }, []);

    return (
        <div className="ps-footer__widgets">
            <aside className="widget widget_footer widget_contact-us">
                <h4 className="widget-title">Contact us</h4>
                <div className="widget_content">
                    <p>Call Us</p>
                    <h3>{Contact}</h3>
                    <p>
                        {Address}
                        <br />
                        {Facebook && <a href={Mail}>{Mail}</a>}
                    </p>
                    <ul className="ps-list--social">
                        <li>
                            {Facebook && (
                                <a className="facebook" href={Facebook}>
                                    <i className="fa fa-facebook"></i>
                                </a>
                            )}
                        </li>
                        <li>
                            {Twitter && (
                                <a className="twitter" href={Twitter}>
                                    <i className="fa fa-twitter"></i>
                                </a>
                            )}
                        </li>
                        <li>
                            {Google && (
                                <a className="google-plus" href={Google}>
                                    <i className="fa fa-google-plus"></i>
                                </a>
                            )}
                        </li>
                        <li>
                            {Instagram && (
                                <a className="instagram" href={Instagram}>
                                    <i className="fa fa-instagram"></i>
                                </a>
                            )}
                        </li>
                    </ul>
                </div>
            </aside>
            <aside className="widget widget_footer">
                <h4 className="widget-title">Quick links</h4>
                <ul className="ps-list--link">
                    <li>
                        <Link href="/page/blank">
                            <a>Policy</a>
                        </Link>
                    </li>

                    <li>
                        <Link href="/page/blank">
                            <a>Term & Condition</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/blank">
                            <a>Shipping</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/blank">
                            <a>Return</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/faqs">
                            <a>FAQs</a>
                        </Link>
                    </li>
                </ul>
            </aside>
            <aside className="widget widget_footer">
                <h4 className="widget-title">Company</h4>
                <ul className="ps-list--link">
                    <li>
                        <Link href="/page/about-us">
                            <a>About Us</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/blank">
                            <a>Affiliate</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/blank">
                            <a>Career</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/contact-us">
                            <a>Contact</a>
                        </Link>
                    </li>
                </ul>
            </aside>
            <aside className="widget widget_footer">
                <h4 className="widget-title">Business</h4>
                <ul className="ps-list--link">
                    <li>
                        <Link href="/page/about-us">
                            <a>Our Press</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account/checkout">
                            <a>Checkout</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account/user-information">
                            <a>My account</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop">
                            <a>Shop</a>
                        </Link>
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default FooterWidgets;
