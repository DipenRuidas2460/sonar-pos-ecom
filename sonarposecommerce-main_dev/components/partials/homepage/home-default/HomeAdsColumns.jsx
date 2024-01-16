import React, { useEffect, useState } from 'react';

import MediaRepository from '~/repositories/MediaRepository';
import { getItemBySlug } from '~/utilities/product-helper';
import Promotion from '~/components/elements/media/Promotion';

const HomeAdsColumns = ({ResponseItems}) => {
    // console.log("HomeAdsColumns Items ==>", ResponseItems);

    const [promotion1, setPromotion1] = useState(null);
    const [promotion2, setPromotion2] = useState(null);
    const [promotion3, setPromotion3] = useState(null);

    // async function getPromotions() {
    //     const responseData = await MediaRepository.getPromotionsBySlug(
    //         'home_fullwidth_promotions'
    //     );
    //     if (responseData.length > 0) {
    //         // setPromotion1(getItemBySlug(responseData[0].ImageUrl, 'middle_1'));
    //         setPromotion1(responseData[3].ImageUrl, 'middle_1');
    //         setPromotion2(responseData[4].ImageUrl, 'middle_2');
    //         setPromotion3(responseData[5].ImageUrl, 'middle_3');
    //     }
    // }

    
    function BindMiddleBannerItems()
    {        
        if (ResponseItems) {
            if (ResponseItems.length > 0) {
                const promotionBanners1 = ResponseItems.filter(
                    (item) => item.BannerType === 'MIDDLE BANNER LEFT'
                );
                setPromotion1(promotionBanners1[0].ImageUrl, 'middle_1');

                const promotionBanners2 = ResponseItems.filter(
                    (item) => item.BannerType === 'MIDDLE BANNER CENTER'
                );
                setPromotion2(promotionBanners2[0].ImageUrl, 'middle_2');

                const promotionBanners3 = ResponseItems.filter(
                    (item) => item.BannerType === 'MIDDLE BANNER RIGHT'
                );
                setPromotion3(promotionBanners3[0].ImageUrl, 'middle_3');

            }
        }

    }

    useEffect(() => {
        // getPromotions();
        BindMiddleBannerItems();
    }, []);

    return (
        <div className="ps-home-ads">
            <div className="ps-container">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
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
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        <Promotion
                            link="/shop"
                            image={promotion3 ? promotion3 : null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeAdsColumns;
