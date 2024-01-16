import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import axios from 'axios';
import {
    baseUrl,
    baseAuthUrl,
    GeneralGetUrl,
    baseGeneralUrl,
} from '../../../repositories/Repository';
const ShopBanner = () => {
    const [Logo1, setLogo1] = useState(null);
    const [Logo2, setLogo2] = useState(null);
    const endPoint = `bannersshow`;
    useEffect(() => {
        axios
            .get(`${GeneralGetUrl}/${baseGeneralUrl}/${endPoint}`)
            .then((res) => {
                if (res.data.ResponseData) {
                    setLogo1(res.data.ResponseData[13].ImageUrl);
                    setLogo2(res.data.ResponseData[14].ImageUrl);
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
    const carouselSetting = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <div className="ps-shop-banner">
            <Slider {...carouselSetting} fade={true} className="ps-carousel">
                <img src={Logo1} alt="Sonar POS Ecommerce" />
                <img src={Logo2} alt="Sonar POS Ecommerce" />
            </Slider>
        </div>
    );
};

export default ShopBanner;
