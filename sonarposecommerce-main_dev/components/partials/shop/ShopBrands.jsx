import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    baseUrl,
    baseAuthUrl,
    GeneralGetUrl,
    baseGeneralUrl,
} from '../../../repositories/Repository';
import axios from 'axios';
import { Form, Input, notification } from 'antd';

const ShopBrands = () => {
    const [Logo1, setLogo1] = useState([]);
    const [Logo2, setLogo2] = useState([]);
    useEffect(() => {
        axios
            .get(`${GeneralGetUrl}/${baseGeneralUrl}/supplierlogo`)
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    setLogo1(res.data.ResponseData[0].Logo);
                    setLogo2(res.data.ResponseData[1].Logo);
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseID === -1
                ) {
                    console.log('error');
                } else {
                    toastError('Something went wrong, Try Again!!!');
                }
            })
            .catch((error) => {});
    }, []);

    return (
        <div className="ps-shop-brand">
            <Link href="/shop">
                <a>
                    <img
                        src={Logo1}
                        style={{ width: '150px', height: '100px' }}
                        alt="Sonar POS Ecomm"
                    />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img
                        src={Logo2}
                        style={{ width: '200px', height: '100px' }}
                        alt="Sonar POS Ecommerce"
                    />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img
                        src={Logo1}
                        style={{ width: '150px', height: '100px' }}
                        alt="Sonar POS Ecommerce"
                    />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img
                        src={Logo2}
                        style={{ width: '200px', height: '100px' }}
                        alt="Sonar POS Ecommerce"
                    />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img
                        src="/static/img/brand/5.jpg"
                        alt="Sonar POS Ecommerce"
                    />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img
                        src="/static/img/brand/6.jpg"
                        alt="Sonar POS Ecommerce"
                    />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img
                        src="/static/img/brand/7.jpg"
                        alt="Sonar POS Ecommerce"
                    />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img
                        src="/static/img/brand/8.jpg"
                        alt="Sonar POS Ecommerce"
                    />
                </a>
            </Link>
        </div>
    );
};

export default ShopBrands;
