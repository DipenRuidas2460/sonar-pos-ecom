import React, { useEffect, useState } from 'react';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import ShopItems from '~/components/partials/shop/ShopItems';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';
import WidgetShopAttributes from '~/components/shared/widgets/WidgetShopAttributes';
import { useRouter } from 'next/router';
// import CryptoJS from "crypto-js";
// // import { encryptData,decryptData } from '~/utilities/common-helpers';

// export const decryptData = (text) => {
//     const data = CryptoJS.AES.decrypt(text, "XkhZG4fW2t2W").toString(CryptoJS.enc.Utf8);
//     return data;
// };

const ShopSidebarWithoutBannerPage = () => {
    const Router = useRouter();
    const { query, name } = Router.query; // Router.query

    // let cid = 0;
    // if(query)
    // {
    //     cid = query;
    //     // console.log("Router.query decryptData ==>", query);
    //     // console.log("Router.query decryptData ==>", decryptData(query));
    //     // // let queryStringParam =  decryptData(query);

    //     // // console.log("queryStringParam ==>", queryStringParam.split("="));
    //     // // cid = queryStringParam.split("=")[1];

    //     // cid = decryptData(query);
    // }

    const [shopAttributes, setShopAttributes] = useState([]);
    const [shopBrands, setShopBrands] = useState();
    const [itemPrice, setItemPrice] = useState();
    const [categoryID, setCategoryID] = useState();

    const breadCrumb = [{text: 'Home',url: '/',},{text: 'Shop',}];
    if(query)
    {
        breadCrumb = [{text: 'Home',url: '/',},{text: 'Shop',url: '/shop/shop-sidebar-without-banner',},{text: name }];
    }
    
    const callBackMethodShopAttributes = (payload) => {
        setShopAttributes(payload);
    };

    const callBackMethodBrands = (payload) => {
        setShopBrands(payload);
    };

    const callBackMethodPrice = (payload) => {
        setItemPrice(payload);
    };

    const callBackMethodCategory = (payload) => {
        setCategoryID(payload);
    }

    useEffect(() => {
        setCategoryID(query > 0 ? query : 0);
    }, [query]);



    return (
        <PageContainer footer={<FooterDefault />} title="Shop Sidebar">
            <BreadCrumb breacrumb={breadCrumb} />
            <div className="ps-page--shop" id="shop-sidebar">
                <div className="container">
                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WidgetShopCategories
                                callBackMethod={callBackMethodCategory}
                            />
                            <WidgetShopBrands
                                callBackMethod={callBackMethodBrands}
                            />
                            <WidgetShopFilterByPriceRange
                                callBackMethod={callBackMethodPrice}
                            />
                            <WidgetShopAttributes
                                callBackMethod={callBackMethodShopAttributes}
                            />
                        </div>
                        <div className="ps-layout__right">
                            {/* <div className="ps-page__header">
                                <h1>Shop Sidebar</h1>
                            </div> */}
                            {/* {(shopAttributes || shopBrands || itemPrice || categoryID) && (
                                <>
                                    <ShopItems
                                        columns={4}
                                        pageSize={12}
                                        shopAttributes={shopAttributes}
                                        brand={shopBrands}
                                        itemPrice={itemPrice}
                                        categoryID={categoryID}
                                    />
                                </>
                            )} */}

                            <ShopItems
                                columns={4}
                                pageSize={12}
                                shopAttributes={shopAttributes}
                                brand={shopBrands}
                                itemPrice={itemPrice}
                                categoryID={categoryID}
                            />

                        </div>
                    </div>
                </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default ShopSidebarWithoutBannerPage;
