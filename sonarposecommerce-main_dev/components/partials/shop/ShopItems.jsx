import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import ProductWide from '~/components/elements/products/ProductWide';
import ProductRepository from '~/repositories/ProductRepository';
import ModuleShopSortBy, {
    GetDataForBarcodeGeneration,
} from '~/components/partials/shop/modules/ModuleShopSortBy';
import { useRouter } from 'next/router';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import useGetProducts from '~/hooks/useGetProducts';
// import axios from 'axios';
// import Repository, {
//     baseUrl,
//     baseAuthUrl,
//     ProductGetUrl,
//     baseProductUrl,
// } from './../../../repositories/Repository';
import { useSelector } from 'react-redux';

const ShopItems = ({
    columns = 4,
    pageSize = 12,
    shopAttributes,
    brand,
    itemPrice,
    categoryID,
}) => {
    const Router = useRouter();
    const { page } = Router.query;
    const { query } = Router;
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [listView, setListView] = useState(true);
    const [total, setTotal] = useState(0); // temporary set 4 total page size
    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );
    const loginId = useSelector((state) => state.auth.loginId);

    const {
        totalRecords,
        productItems,
        setProductItems,
        loading,
        getProducts,
    } = useGetProducts();

    function handleChangeViewMode(e) {
        e.preventDefault();
        setListView(!listView);
    }

    function handlePagination(page, pageSize) {
        setCurrentPageIndex(page);

        let params = {
            Page: page,
            PageSize: pageSize,
            PriceOrder: GetDataForBarcodeGeneration(),
            LatestProduct: GetDataForBarcodeGeneration(),
            LoginUserID: loginId,
            MinPrice: itemPrice ? itemPrice.minprice : 0,
            MaxPrice: itemPrice ? itemPrice.maxprice : 10000,
            BrandID: brand ? brand : '',
            AttributeID: shopAttributes ? shopAttributes : '',
            CategoryID: categoryID,
        };
        getProducts(params);

        // setTotal(productItems ? productItems[0].TotatRecords : 0);
        // // Router.push(`/shop/shop-sidebar-without-banner?page=${page}`);
        // // Pass Login User ID
        // console.log("handlePagination loginId ==>", loginId);
        // axios
        //     .get(
        //         `${ProductGetUrl}/${baseProductUrl}/productfilteration?MinPrice=&MaxPrice=&CategoryID=&BrandID=&AttributeID=&PriceOrder=&LatestProduct=&PageNumber=${page}&PageSize=${pageSize}&FilterText=&LoginUserID=${loginId}`
        //     )
        //     .then((res) => {
        //         if (res.data) {
        //             if (res.data.ResponseData.length > 0) {
        //                 return res.data.ResponseData;
        //             }
        //         } else {
        //             return null;
        //         }
        //     })
        //     .catch(() => {
        //         return null;
        //     });
    }

    // async function getTotalRecords(params) {
    //     const responseData = await ProductRepository.getTotalRecords();
    //     if (responseData) {
    //         setTotal(responseData);
    //     }
    // }

    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
                return 4;
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
                return 6;
                break;

            default:
                setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
        }
    }

    const callBackMethodSortBy = (sortBy) => {
        let params = {
            Page: page,
            PageSize: pageSize,
            PriceOrder: sortBy,
            LatestProduct: sortBy,
            LoginUserID: loginId,
            MinPrice: itemPrice ? itemPrice.minprice : 0,
            MaxPrice: itemPrice ? itemPrice.maxprice : 10000,
            BrandID: brand ? brand : '',
            AttributeID: shopAttributes ? shopAttributes : '',
            CategoryID: categoryID,
        };
        getProducts(params);
        // setTotal(productItems ? productItems[0].TotatRecords : 0);
    };

    async function getCategry() {
        let params = {
            Page: page,
            PageSize: pageSize,
            PriceOrder: GetDataForBarcodeGeneration(),
            LatestProduct: GetDataForBarcodeGeneration(),
            LoginUserID: loginId,
            MinPrice: itemPrice ? itemPrice.minprice : 0,
            MaxPrice: itemPrice ? itemPrice.maxprice : 10000,
            BrandID: brand ? brand : '',
            AttributeID: shopAttributes ? shopAttributes : '',
            CategoryID: categoryID,
        };
        getProducts(params);
        // setTotal(productItems ? productItems[0].TotatRecords : 0);

        // // setLoading(true);
        // if (shopAttributes || brand) {
        //     const responseData = await ProductRepository.getProductsByAttributes(
        //         shopAttributes ? shopAttributes : '',
        //         brand ? brand : ''
        //     );
        //     if (responseData) {
        //         setProductItems(responseData);
        //         setTimeout(
        //             function () {
        //                 // setLoading(false);
        //             }.bind(this),
        //             250
        //         );
        //     }
        // } else {
        //     await Router.push('/shop/shop-sidebar-without-banner');
        // }
    }

    useEffect(() => {
        console.log('shopAttributes ==>', shopAttributes);

        let params = {
            Page: 1,
            PageSize: pageSize,
            PriceOrder: GetDataForBarcodeGeneration(),
            LatestProduct: GetDataForBarcodeGeneration(),
            LoginUserID: loginId > 0 ? loginId : 0,
            MinPrice: itemPrice ? itemPrice.minprice : 0,
            MaxPrice: itemPrice ? itemPrice.maxprice : 10000,
            BrandID: brand ? brand : '',
            AttributeID: shopAttributes ? shopAttributes : '',
            CategoryID: categoryID > 0 ? categoryID : 0,
        };
        getProducts(params);
        // getCategry();
        // getTotalRecords();
        handleSetColumns();
    }, [shopAttributes, brand, categoryID, itemPrice]);

    // useEffect(() => {
    //     getCategry();
    // }, [brand]);

    // Viewsquery
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            if (listView) {
                const items = productItems.map((item) => (
                    <div className={classes} key={item.ID}>
                        <Product product={item} />
                    </div>
                ));
                productItemsView = (
                    <div className="ps-shop-items">
                        <div className="row">{items}</div>
                    </div>
                );
            } else {
                productItemsView = productItems.map((item) => (
                    <ProductWide product={item} />
                ));
            }
        } else {
            productItemsView = <p>No product found.</p>;
        }
    } else {
        const skeletonItems = generateTempArray(12).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        if (productItems && productItems.length > 0) {
            productItemsView = <div className="row">{skeletonItems}</div>;
        } else {
            productItemsView = (
                <div className="row">
                    <div className="col-md-12">No product found.</div>
                </div>
            );
        }
    }

    return (
        <div className="ps-shopping">
            <div className="ps-shopping__header">
                <p>
                    <strong className="mr-2">{totalRecords}</strong>
                    Products found
                </p>
                <div className="ps-shopping__actions">
                    <ModuleShopSortBy callBackMethod={callBackMethodSortBy} />
                    <div className="ps-shopping__view">
                        <p>View</p>
                        <ul className="ps-tab-list">
                            <li className={listView === true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={(e) => handleChangeViewMode(e)}>
                                    <i className="icon-grid"></i>
                                </a>
                            </li>
                            <li className={listView !== true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={(e) => handleChangeViewMode(e)}>
                                    <i className="icon-list4"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="ps-shopping__content">{productItemsView}</div>
            <div className="ps-shopping__footer text-center">
                <div
                    className={`ps-pagination ${
                        totalRecords == 0 ? 'd-none' : ''
                    }`}>
                    {totalRecords && (
                        <>
                            <Pagination
                                // total={total - 1}
                                total={totalRecords}
                                pageSize={pageSize}
                                responsive={true}
                                //showSizeChanger={true}
                                current={
                                    currentPageIndex !== undefined
                                        ? parseInt(currentPageIndex)
                                        : 1
                                }
                                onChange={(e, f) => handlePagination(e, f)}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopItems;
