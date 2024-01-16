import { useState } from 'react';
import {
    getProductsByCategoriesHelper,
    getProductsByCollectionHelper,
    getNewArrivalsByCollectionHelper,
} from '~/utilities/strapi-fetch-data-helpers';
import ProductRepository from '~/repositories/ProductRepository';

export default function useGetNewArrivals() {
    const [loading, setLoading] = useState(false);
    const [NewArrivalsItems, setNewArrivalsItems] = useState(null);
    const [NewArrivals, setNewArrivals] = useState(null);
    return {
        loading,
        NewArrivalsItems,
        NewArrivals,
        setNewArrivalsItems: (payload) => {
            setNewArrivalsItems(payload);
        },

        setLoading: (payload) => {
            setLoading(payload);
        },

        getNewArrivalsByCollection: async (payload) => {
            setLoading(true);
            const responseData = await getNewArrivalsByCollectionHelper(
                payload
            );
            if (responseData) {
                setNewArrivalsItems(responseData.items);
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
                setNewArrivalsItems(responseData.items);
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
            let responseData;
            if (payload) {
                responseData = await ProductRepository.getProducts(payload);
            } else {
                const queries = {
                    _limit: 12,
                };
                responseData = await ProductRepository.getProducts(queries);
            }
            if (responseData) {
                setNewArrivalsItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductById: async (payload) => {
            setLoading(true);
            const responseData = await ProductRepository.getProductsById(
                payload
            );
            if (responseData) {
                setNewArrivals(responseData);
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
