import { useState } from 'react';
import {
    getProductsByCategoriesHelper,
    getProductsByCollectionHelper,
    getFeaturedProductByCollectionHelper,
    getDealsOfDayByCollectionHelper,
} from '~/utilities/strapi-fetch-data-helpers';
import ProductRepository from '~/repositories/ProductRepository';

export default function useGetProducts() {
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [product, setProduct] = useState(null);
    const [totalRecords, setTotalRecords] = useState(null);

    return {
        loading,
        setLoading,
        totalRecords,
        setTotalRecords: (payload) => {
            setTotalRecords(payload);
        },
        productItems,
        setProductItems,
        product,
        setProductItems: (payload) => {
            setProductItems(payload);
        },

        setLoading: (payload) => {
            setLoading(payload);
        },

        getProductsByCollection: async (payload) => {
            setLoading(true);
            const responseData = await getProductsByCollectionHelper(payload);
            if (responseData) {
                setProductItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getDealsOfDayByCollection: async (payload) => {
            setLoading(true);
            const responseData = await getDealsOfDayByCollectionHelper(payload);
            if (responseData) {
                setProductItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getFeaturedProductByCollection: async (payload) => {
            setLoading(true);
            const responseData = await getFeaturedProductByCollectionHelper(
                payload
            );
            if (responseData) {
                setProductItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductsByCategory: async (payload) => {
            setLoading(true);
            const responseData = await getProductsByCategoriesHelper(payload);
            if (responseData) {
                setProductItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProducts: async (payload) => {
            setLoading(true);
            const responseData = await ProductRepository.getProducts(payload);
            if (responseData) {
                console.log("useGetProducts : responseData ===>", responseData);
                setProductItems(responseData);
                setTotalRecords(responseData && responseData.length > 0 ? responseData[0].TotalRecords : 0);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
            else
            {
                setProductItems([]);
                setTotalRecords(0);
            }
        },

        // getProducts: async (payload) => {
        //     setLoading(true);
        //     let responseData;
        //     if (payload) {
        //         responseData = await ProductRepository.getProducts(payload);
        //     } else {
        //         const queries = {
        //             _limit: 12,
        //         };
        //         responseData = await ProductRepository.getProducts(queries);
        //     }
        //     if (responseData) {
        //         setProductItems(responseData);
        //         setTimeout(
        //             function () {
        //                 setLoading(false);
        //             }.bind(this),
        //             250
        //         );
        //     }
        // },

        getProductById: async (payload) => {
            setLoading(true);
            const responseData = await ProductRepository.getProductsById(
                payload
            );
            if (responseData) {
                setProduct(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },
    };
}
