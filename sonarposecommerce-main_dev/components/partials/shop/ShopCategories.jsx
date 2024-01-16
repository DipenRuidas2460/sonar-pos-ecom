import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
    baseUrl,
    baseAuthUrl,
    GeneralGetUrl,
    baseGeneralUrl,
} from '../../../repositories/Repository';
import shop_data from '~/public/static/data/shopCategories';

const ShopCategories = () => {
    const [Categories, setCategories] = useState([]);
    const endPoint = `categoryandsubcategorylisting`;
    useEffect(() => {
        axios
            .get(`${GeneralGetUrl}/${baseGeneralUrl}/${endPoint}`)
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    setCategories(res.data.ResponseData.MainCategoryData);
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
        <div className="ps-shop-categories">
            <div className="row align-content-lg-stretch">
                {Categories.map((category) => (
                    <div
                        className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 "
                        key={category.ID}>
                        <div
                            className="ps-block--category-2"
                            data-mh="categories">
                            <div className="ps-block__thumbnail">
                                <img
                                    src={category.Image}
                                    alt="SonarPos Ecomm"
                                />
                            </div>
                            <div className="ps-block__content">
                                <h4>{category.MainCategory}</h4>
                                <ul>
                                    {category.links &&
                                        category.links.map((link) => (
                                            <li key={link}>
                                                <Link href="/shop" as={`/shop`}>
                                                    <a>{link}</a>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ShopCategories;
