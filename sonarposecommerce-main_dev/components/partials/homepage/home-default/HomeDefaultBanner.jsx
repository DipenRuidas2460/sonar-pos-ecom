import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';
// import { baseUrl } from '~/repositories/Repository';
// import { getItemBySlug } from '~/utilities/product-helper';
import Promotion from '~/components/elements/media/Promotion';

const HomeDefaultBanner = ({ ResponseItems }) => {
    // console.log("HomeDefaultBanner Items ==>", ResponseItems);
    const [bannerItems, setBannerItems] = useState(null);
    const [promotion1, setPromotion1] = useState(null);
    const [promotion2, setPromotion2] = useState(null);

    // async function getBannerItems() {
    //     const responseData = await MediaRepository.getBannersBySlug(
    //         'banner-home-fullwidth'
    //     );

    //     if (responseData.length > 0) {
    //         setBannerItems(responseData);
    //     }
    // }

    // async function getPromotions() {
    //     const responseData = await MediaRepository.getPromotionsBySlug(
    //         'home_fullwidth_promotions'
    //     );
    //     console.log("responseData =>", responseData);
    //     if (responseData.length > 0) {
    //         setPromotion1(responseData[1].ImageUrl, 'main_1');
    //         setPromotion2(responseData[2].ImageUrl, 'main_2');
    //     }
    // }

    function BindTopBannerItems() {
        // console.log("BindTopBannerItems ==>", ResponseItems);
        if (ResponseItems) {
            // console.log(ResponseItems.length);
            if (ResponseItems.length > 0) {
                // console.log("HomeDefaultBanner sliderBanners CALL");

                const sliderBanners = ResponseItems.filter(
                    (item) => item.BannerType === 'TOP SLIDER BANNER'
                );
                setBannerItems(sliderBanners);

                const promotionBanners1 = ResponseItems.filter(
                    (item) => item.BannerType === 'TOP RIGHT BANNER FIRST'
                );
                setPromotion1(promotionBanners1[0].ImageUrl, 'main_1');

                const promotionBanners2 = ResponseItems.filter(
                    (item) => item.BannerType === 'TOP RIGHT BANNER SECOND'
                );
                setPromotion2(promotionBanners2[0].ImageUrl, 'main_2');
            }
        }
    }

    useEffect(() => {
        // getBannerItems();
        // getPromotions();

        BindTopBannerItems();
    }, []);

    const carouselSetting = {
        dots: false,
        infinite: true,
        speed: 750,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    // Views
    let mainCarouselView;
    if (bannerItems) {
        const carouseItems = bannerItems.map((item) => (
            <div className="slide-item" key={item.ID}>
                <Link href="/shop">
                    <a
                        className="ps-banner-item--default bg--cover"
                        style={{
                            backgroundImage: `url(${item.ImageUrl})`,
                        }}
                    />
                </Link>
            </div>
        ));
        mainCarouselView = (
            <Slider {...carouselSetting} className="ps-carousel">
                {carouseItems}
            </Slider>
        );
    }
    return (
        <div className="ps-home-banner ps-home-banner--1">
            <div className="ps-container">
                <div className="ps-section__left">{mainCarouselView}</div>
                <div className="ps-section__right">
                    <Promotion
                        link="/shop"
                        image={promotion1 ? promotion1 : null}
                    />
                    <Promotion
                        link="/shop"
                        image={promotion2 ? promotion2 : null}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeDefaultBanner;
