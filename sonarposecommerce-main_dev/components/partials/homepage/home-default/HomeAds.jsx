import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import MediaRepository from '~/repositories/MediaRepository';
import { getItemBySlug } from '~/utilities/product-helper';
import Promotion from '~/components/elements/media/Promotion';

const HomeAds = ({ ResponseItems }) => {
    // console.log("HomeAds Items ==>", ResponseItems);
    const [promotion1, setPromotion1] = useState(null);
    const [promotion2, setPromotion2] = useState(null);

    // async function getPromotions() {
    //     const responseData = await MediaRepository.getPromotionsBySlug(
    //         'home_fullwidth_promotions'
    //     );
    //     if (responseData.length > 0) {
    //         // setPromotion1(getItemBySlug(responseData[0].ImageUrl, 'footer_1'));
    //         setPromotion1(responseData[6].ImageUrl, 'footer_1');
    //         setPromotion2(responseData[7].ImageUrl, 'footer_2');
    //     }
    // }

    function BindFooterBannerItems() {
        if (ResponseItems) {
            // console.log(ResponseItems.length);
            if (ResponseItems.length > 0) {
                const promotionBanners1 = ResponseItems.filter(
                    (item) => item.BannerType === 'FOOTER BANNER FIRST'
                );
                setPromotion1(promotionBanners1[0].ImageUrl, 'footer_1');

                const promotionBanners2 = ResponseItems.filter(
                    (item) => item.BannerType === 'FOOTER BANNER SECOND'
                );
                setPromotion2(promotionBanners2[0].ImageUrl, 'footer_2');
            }
        }
    }

    useEffect(() => {
        // getPromotions();
        BindFooterBannerItems();
    }, []);
    return (
        <div className="ps-home-ads">
            <div className="ps-container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 ">
                        {/* <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 "> */}
                        <Promotion
                            link="/shop"
                            image={promotion1 ? promotion1 : null}
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        <Promotion
                            link="/shop"
                            image={promotion2 ? promotion2 : null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeAds;
