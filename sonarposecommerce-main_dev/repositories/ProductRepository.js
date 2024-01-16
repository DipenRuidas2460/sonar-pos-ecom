import Product from '~/components/elements/products/Product';
import Repository, {
    baseUrl,
    baseAuthUrl,
    ProductGetUrl,
    baseProductUrl,
    serializeQuery,
    GeneralGetUrl,
    baseGeneralUrl,
} from './Repository';
import axios from 'axios';

class ProductRepository {
    async getRecords(params) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(params)}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProducts(params) {
        // console.log("params ===>>>", params);
        // Pass Login User ID

        const reponse = await axios
            .get(
                `${ProductGetUrl}/${baseProductUrl}/productfilteration?MinPrice=${params.MinPrice}&MaxPrice=${params.MaxPrice}&CategoryID=${params.CategoryID}&BrandID=${params.BrandID}&AttributeID=${params.AttributeID}&PriceOrder=${params.PriceOrder}&LatestProduct=${params.LatestProduct}&PageNumber=${params.Page}&PageSize=${params.PageSize}&FilterText=&LoginUserID=${params.LoginUserID}`
            )
            // .get(`${baseUrl}/${baseAuthUrl}/products?${serializeQuery(params)}`)
            .then((res) => {
                if (res.data.ResponseData.length > 0) {
                    return res.data.ResponseData;
                } else {
                    return null;
                }
            })

            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getBrands() {
        const reponse = await axios
            .get(`${GeneralGetUrl}/${baseGeneralUrl}/getbrands`)
            .then((res) => {
                return res.data.ResponseData;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getAttributes() {
        const reponse = await axios
            .get(`${GeneralGetUrl}/${baseGeneralUrl}/getattributes`)
            .then((res) => {
                // console.log('res.data.ResponseData', res.data.ResponseData);
                return res.data.ResponseData;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductCategories(params) {
        const reponse = await axios
            .post(
                `${GeneralGetUrl}/${baseGeneralUrl}/categoryandsubcategorylisting`,
                {
                    ParentID: params ? params : 0,
                }
            )
            .then((res) => {
                return res.data.ResponseData.CategoryDetails;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    // async getProductCategories() {
    //     const reponse = await Repository.get(`${baseUrl}/product-categories`)
    //         .then((response) => {
    //             return response.data;
    //         })
    //         .catch((error) => ({ error: JSON.stringify(error) }));
    //     return reponse;
    // }

    async getTotalRecords() {
        const reponse = await Repository.get(`${baseUrl}/products/count`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsById(payload) {
        // console.log("payload getProductsById ==>", payload);
        const reponse = await axios
            .get(
                `${ProductGetUrl}/products/detail?itemid=${payload.itemid}&loginuserid=${payload.loginuserid}`
            )
            .then((response) => {
                return response.data.ResponseData;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByCategory(payload) {
        // Pass Login User ID

        const reponse = await axios
            .get(
                `${ProductGetUrl}/${baseProductUrl}/productfilteration/?MinPrice=&MaxPrice=&CategoryID=${payload}&BrandID=&AttributeID=&PriceOrder=&LatestProduct=&PageNumber=1&PageSize=12&FilterText=`
            )
            .then((response) => {
                if (response.data) {
                    if (response.data.ResponseData.length > 0) {
                        return response.data.ResponseData;
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByBrand(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/brands?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    // async getProductsByAttributes(payload) {
    //     console.log('payloadddddd::>>>', payload);
    //     const reponse = await axios
    //         .get(
    //             `${ProductGetUrl}/${baseProductUrl}/productfilteration?MinPrice=&MaxPrice=&CategoryID=&AttributeID=${payload}&PriceOrder=&LatestProduct=&PageNumber=1&PageSize=12&FilterText=`
    //         )
    //         .then((response) => {
    //             if (response.data) {
    //                 if (response.data.ResponseData.length > 0) {
    //                     console.log(
    //                         'response.data.ResponseData234',
    //                         response.data.ResponseData
    //                     );
    //                     return response.data.ResponseData;
    //                 }
    //             } else {
    //                 return null;
    //             }
    //         })
    //         .catch(() => {
    //             return null;
    //         });
    //     return reponse;
    // }

    async getProductsByAttributes(attributes, brands) {
        // console.log('payloadddddd::>>>', attributes);
        // console.log('brandsssss', brands);

        const minPrice = '';
        const maxPrice = '';
        const categoryID = '';
        const brandID = brands ? brands : '';
        const attributeID = attributes ? attributes : '';
        const priceOrder = '';
        const latestProduct = '';
        const pageNumber = 1;
        const pageSize = 20;
        const filterText = '';
        const LoginUserID = 0;

        // Pass Login User ID
        const response = await axios
            .get(
                `${ProductGetUrl}/${baseProductUrl}/productfilteration?MinPrice=${minPrice}&MaxPrice=${maxPrice}&CategoryID=${categoryID}&BrandID=${brandID}&AttributeID=${attributeID}&PriceOrder=${priceOrder}&LatestProduct=${latestProduct}&PageNumber=${pageNumber}&PageSize=${pageSize}&FilterText=${filterText}&LoginUserID=${LoginUserID}`
            )
            .then((response) => {
                if (response.data && response.data.ResponseData.length > 0) {
                    // console.log(
                    //     'response.data.ResponseData234',
                    //     response.data.ResponseData
                    // );
                    return response.data.ResponseData;
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });

        return response;
    }

    async getProductsByIds(payload) {
        const reponse = await axios
            .get(
                `${ProductGetUrl}/${baseProductUrl}/wishlistitemlisting?CustomerID=${payload}`
            )
            .then((response) => {
                if (response.data) {
                    if (response.data.ResponseData.length > 0) {
                        // console.log(
                        //     'attributes ===>>',
                        //     response.data.ResponseData
                        // );
                        return response.data.ResponseData;
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
        // const endPoint = `${ProductGetUrl}/products?${payload}`;
        // const reponse = await Repository.get(endPoint)
        //     .then((response) => {
        //         if (response.data && response.data.length > 0) {
        //             return response.data;
        //         } else {
        //             return null;
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(JSON.stringify(error));
        //         return null;
        //     });
        // return reponse;
    }

    async recentviewproduct(payload) {
        const data = {
            id: payload.id,
            itemid: payload.pid,
            customerid: payload.loginid,
            loginuserid: payload.loginid,
        };
        const reponse = await axios
            .post(`${ProductGetUrl}/${baseProductUrl}/insertproduct`, data)
            .then((response) => {
                if (response.data) {
                    if (response.data.ResponseData.length > 0) {
                        // console.log(response.data.ResponseData);
                        return response.data.ResponseData;
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }
}

export default new ProductRepository();
