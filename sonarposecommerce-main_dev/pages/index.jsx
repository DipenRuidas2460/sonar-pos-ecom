import React, { useEffect, useState } from 'react';
import SiteFeatures from '~/components/partials/homepage/home-default/SiteFeatures';
import HomeAdsColumns from '~/components/partials/homepage/home-default/HomeAdsColumns';
import HomeAds from '~/components/partials/homepage/home-default/HomeAds';
import DownLoadApp from '~/components/partials/commons/DownLoadApp';
import NewArrivals from '~/components/partials/homepage/home-default/NewArrivals';
import Newletters from '~/components/partials/commons/Newletters';
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories';
import HomeDefaultProductListing from '~/components/partials/homepage/home-default/HomeDefaultProductListing';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';
import PageContainer from '~/components/layouts/PageContainer';
import HomeDefaultFeaturedProductListing from '~/components/partials/homepage/home-default/HomeDefaultFeaturedProduct';
import axios from 'axios';
import MediaRepository from '~/repositories/MediaRepository';
import { ProductGetUrl, baseProductUrl } from '~/repositories/Repository';
// import localStorage from 'redux-persist/es/storage';
// import localStorage from 'redux-persist/es/storage';

const HomepageDefaultPage = () => {
    const [bannerAndOffersItems, setBannerAndOffersItems] = useState(null);
    const [topCategories, setTopCategories] = useState(null);
    const [featuredProducts, setFeaturedProducts] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('Token'));
        }
    }, []);

    async function getHomePageAllBannersAndOffers() {
        const responseData = await MediaRepository.getHomePageAllBannersAndOffers();

        // console.log("responseData getHomePageAllBannersAndOffers ==> ", responseData);
        if (responseData.length > 0) {
            setBannerAndOffersItems(responseData);
        }
    }

    useEffect(() => {
        getHomePageAllBannersAndOffers();
    }, []);

    useEffect(() => {
        axios
            .get(
                `${ProductGetUrl}/${baseProductUrl}/commonconfigvaluesecommerce?configtype=CommonConfig`,
                {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        Authorization:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgzNTE4ODYzfQ.aEKJnW9Xv-zfeIAIT0jvL47iRKdL6X4wVQMWSJchS3Y',
                    },
                }
            )
            .then((res) => {
                // console.log('HelloWorldddddddd', res.data.ResponseData);
                setFeaturedProducts(res.data.ResponseData[2].CommonConfigValue);
                setTopCategories(res.data.ResponseData[0].CommonConfigValue);

                // setCommonConfig(res.data.ResponseData);
            })
            .catch((err) => {});
    }, []);

    return (
        <PageContainer title="POS">
            <main id="homepage-1">
                {/* Conditional rendering of child component */}
                {bannerAndOffersItems && (
                    <>
                        <HomeDefaultBanner
                            ResponseItems={bannerAndOffersItems}
                        />
                        {/* <SiteFeatures /> */}
                        <HomeDefaultDealOfDay collectionSlug="deal-of-the-day" />
                        <HomeAdsColumns ResponseItems={bannerAndOffersItems} />
                        {topCategories == 1 && <HomeDefaultTopCategories />}
                        {/* <HomeDefaultFeaturedProductListing
                            collectionSlug="featured-products"
                            title="Featured Products"
                        /> */}
                        {featuredProducts == 1 && (
                            <HomeDefaultFeaturedProductListing
                                collectionSlug="featured-products"
                                title="Featured Products"
                            />
                        )}
                        {/* <HomeDefaultProductListing
                    collectionSlug="consumer-electronics"
                    title="Consumer Electronics"
                />
                <HomeDefaultProductListing
                    collectionSlug="clothings"
                    title="Clothings"
                />
                <HomeDefaultProductListing
                    collectionSlug="garden-and-kitchen"
                    title="Garden & Kitchen"
                /> */}
                        <HomeAds ResponseItems={bannerAndOffersItems} />
                        <DownLoadApp />
                        <NewArrivals collectionSlug="new-arrivals-products" />
                        <Newletters />
                    </>
                )}
            </main>
        </PageContainer>
    );
};

export default HomepageDefaultPage;
