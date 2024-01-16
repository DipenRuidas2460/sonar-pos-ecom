import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
    baseUrl,
    baseAuthUrl,
    baseGeneralUrl,
    GeneralGetUrl,
    baseProductUrl,
    ProductGetUrl,
} from '../../../../repositories/Repository';

const noimage = '../../static/img/noimage.png';

const HomeDefaultTopCategories = () => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        axios
            .get(`${ProductGetUrl}/${baseProductUrl}/topcategoriesshow`, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    setImages(res.data.ResponseData);
                } else if (res.data.ResponseCode === 'ERROR') {
                    console.log('error');
                }
            })
            .catch((error) => {
                console.log('error occurred', error);
            });
    }, []);

    return (
        <div className="ps-top-categories">
            <div className="ps-container">
                <h3>Top categories</h3>

                <div className="row">
                    {images?.map((image) => (
                        <div
                            className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6"
                            key={image.ID}>
                            <div className="ps-block--category">
                                <Link href="/shop">
                                    <a className="ps-block__overlay"></a>
                                </Link>
                                {/* <img src= "../../static/img/app.png" /> */}
                                <img
                                    src={image.Image}
                                    style={{
                                        marginBottom: '20px',
                                        height: '135px',
                                    }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            '../../static/img/noimage.png';
                                    }}
                                />
                                <h4>{image.CategoryName}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="row">
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img src="" alt="Sonar POS Ecommerce" />
                            <p>Electronics</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/2.jpg"
                                alt="Sonar POS Ecommerce"
                            />
                            <p>Clothings</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/3.jpg"
                                alt="Sonar POS Ecommerce"
                            />
                            <p>Computers</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/4.jpg"
                                alt="Sonar POS Ecommerce"
                            />
                            <p>Home & Kitchen</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/5.jpg"
                                alt="Sonar POS Ecommerce"
                            />
                            <p>Health & Beauty</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/6.jpg"
                                alt="Sonar POS Ecommerce"
                            />
                            <p>Health & Beauty</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/7.jpg"
                                alt="Sonar POS Ecommerce"
                            />
                            <p>Jewelry & Watch</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/8.jpg"
                                alt="Sonar POS Ecommerce"
                            />
                            <p>Technology Toys</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default HomeDefaultTopCategories;
