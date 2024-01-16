import Repository, {
    baseUrl,
    baseAuthUrl,
    GeneralGetUrl,
    baseGeneralUrl,
    ProductGetUrl,
    baseProductUrl,
} from './Repository';
import axios from 'axios';

class CollectionRepository {
    async getProductsByCollectionSlug(slug) {
        const reponse = await Repository.get(
            `${baseUrl}/collections?slug_in=${slug}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return { items: response.data[0].products };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getProductsByCategorySlug(slug) {
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?slug_in=${slug}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return { items: response.data[0].products };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getNewArrivalsByCollectionSlug(slug) {
        const reponse = await axios
            .get(`${ProductGetUrl}/${baseProductUrl}/newarrivalsshow`)
            .then((response) => {
                if (response.data.ResponseData.length > 0) {
                    return { items: response.data.ResponseData };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getFeaturedProductByCollectionSlug(payload) {
        // console.log("", payload);
        const reponse = await axios
            .get(
                `${ProductGetUrl}/${baseProductUrl}/featuredproductsshow?LoginUserID=${
                    payload.LoginUserID > 0 ? payload.LoginUserID : 0
                }`
            )
            .then((response) => {
                if (response.data.ResponseData.length > 0) {
                    return response.data.ResponseData;
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getDealsOfDayByCollectionSlug(slug) {
        const reponse = await axios
            .get(`${ProductGetUrl}/${baseProductUrl}/dealsofthedayselect`)
            .then((response) => {
                if (response.data.ResponseData.length > 0) {
                    // console.log(response.data.ResponseData);
                    return response.data.ResponseData;
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
}

export default new CollectionRepository();
