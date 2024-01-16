import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import FooterDefault from '../components/shared/footers/FooterDefault';
import HeaderDefault from '../components/shared/headers/HeaderDefault';
import {
    baseUrl,
    baseAuthUrl,
} from '../repositories/Repository';


function Verified({ statusCode }) {
    const [conditionCheck, setConditionCheck] = useState(false);
    const [checkMessage, setCheckMessage] = useState('');
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        axios
            .post(
                `${baseUrl}/${baseAuthUrl}/verified`,
                {
                    id: '791dfa09-f815-40d1-bc9c-bb811e10c8d4',
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
                    setConditionCheck(true);
                    setCheckMessage(res.data.ResponseMessage);
                    setUserID(res.data.ResponseData[0].ID);
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseData[0].ID === -1
                ) {
                    setCheckMessage(res.data.ResponseMessage);
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseData[0].ID === -2
                ) {
                    setCheckMessage(res.data.ResponseMessage);
                }
            })
            .catch((error) => {
                console.log('error occurred', error);
            });
    }, []);

    return (
        <div className="site-content">
            <HeaderDefault />
            {conditionCheck === true ? (
                <div className="ps-page--404">
                    <div className="container">
                        <div className="ps-section__content">
                            <figure>
                                <img src="/static/img/verified.jpg" alt="" />
                                <h3>{checkMessage}</h3>
                                {/* {conditionCheck ? (
                                    <p>User ID: {0}</p>
                                ) : (
                                    <h3>{checkMessage}</h3>
                                )} */}

                                <p>
                                    Go back to
                                    <Link href="/">
                                        <a style={{ fontSize: '19px' }}>
                                            {''} Login Page
                                        </a>
                                    </Link>
                                </p>
                            </figure>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="ps-page--404">
                    <div className="container">
                        <div className="ps-section__content">
                            <figure>
                                <img
                                    src="/static/img/invalid.avif"
                                    alt=""
                                    height={'300px'}
                                />
                                <h3>{checkMessage}</h3>
                                {/* {conditionCheck ? (
                                    <p>User ID: {userID}</p>
                                ) : (
                                    <h3>{checkMessage}</h3>
                                )} */}

                                <p>
                                    Go back to
                                    <Link href="/">
                                        <a style={{ fontSize: '19px' }}>
                                            {''} Login Page
                                        </a>
                                    </Link>
                                </p>
                            </figure>
                        </div>
                    </div>
                </div>
            )}
            <FooterDefault />
        </div>
    );
}

export default Verified;
