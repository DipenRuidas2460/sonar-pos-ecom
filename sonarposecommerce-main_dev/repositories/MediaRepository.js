import Repository, {
    baseUrl,
    baseAuthUrl,
    GeneralGetUrl,
    baseGeneralUrl,
} from './Repository';
import axios from 'axios';
class MediaRespository {
    async getBannersBySlug(payload) {
        // const endPoint = `banners?slug_in=${payload}`;
        const endPoint = `bannersshow`;

        const response = await axios
            .get(`${GeneralGetUrl}/${baseGeneralUrl}/${endPoint}`)
            .then((response) => {
                if (response.data.ResponseData) {
                    // Filter the response for BannerType === "Banners"
                    const banners = response.data.ResponseData.filter(
                        (item) => item.BannerType === 'Banners'
                    );
                    return banners;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return response;
    }

    async getPromotionsBySlug(payload) {
        const endPoint = `bannersshow`;

        const response = await axios
            .get(`${GeneralGetUrl}/${baseGeneralUrl}/${endPoint}`)
            .then((response) => {
                if (response.data.ResponseData) {
                    // Filter the response for BannerType === "Banners"
                    const Offers = response.data.ResponseData.filter(
                        (item) => item.BannerType === 'Offers'
                    );
                    return Offers;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return response;
    }

    async getHomePageAllBannersAndOffers() {
        const endPoint = `bannersshow`;

        const response = await axios
            .get(`${GeneralGetUrl}/${baseGeneralUrl}/${endPoint}`)
            .then((response) => {
                if (response.data.ResponseData) {
                    return response.data.ResponseData;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return response;
    }
}

export default new MediaRespository();
