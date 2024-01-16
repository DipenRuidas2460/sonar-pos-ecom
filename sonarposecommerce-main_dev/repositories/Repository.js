import axios from 'axios';
const baseDomain = 'https://ecomp-authentication.sonarpos.com/api/v1'; //'http://localhost:4000/api/v1'; // API for products
export const basePostUrl = 'https://ecomp-authentication.sonarpos.com/api/v1'; // 'http://localhost:4000/api/v1'; // API for post 'https://ecomp-authentication.sonarpos.com/api/v1'
export const baseStoreURL = 'http://localhost:1337'; // API for vendor(store)
export const ProductGetUrl = 'https://ecomp-product.sonarpos.com/api/v1'; //'http://localhost:4001/api/v1'; // API For Products
export const ReviewGetUrl = 'https://ecomp-review.sonarpos.com/api/v1'; //'http://localhost:4002/api/v1'; https://ecomp-review.sonarpos.com/api/v1
export const GeneralGetUrl = 'https://ecomp-general.sonarpos.com/api/v1'; //API for general 'http://localhost:4003/api/v1'
export const baseAuthUrl = 'ecomusers'; // API for post
export const baseProductUrl = 'products';
export const baseGeneralUrl = 'general';

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
