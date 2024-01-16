import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import ProductCart from '~/components/elements/products/ProductCart';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ProductGetUrl, baseProductUrl } from '~/repositories/Repository';
import { notification } from 'antd';
// import { useSelector } from 'react-redux';

const Wishlist = ({ ecomerce }) => {
    const { loading, products, setproducts, getProducts } = useEcomerce();
    const { addItem, removeItem } = useEcomerce();
    const [wishlistItems, setWishlistItems] = useState([]);
    // const loginId = useSelector((state) => state.auth.loginId);
    // const loginId = useSelector((state) => state.auth.loginId); // get the loginId from the Redux store
    const loginId = 14;

    function handleAddItemToCart(e, product) {
        e.preventDefault();
        const cartItem = {
            ID: 0,
            DeleteID: product.ID,
            CustomerID: product.CustomerID,
            ItemID: product.ItemID,
            Quantity: 1,
        };
        axios
            .post(`${ProductGetUrl}/${baseProductUrl}/cartinsert`, cartItem, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    notification['success']({
                        message: 'Item Successfully Added to Cart!',
                        description:
                            'You have successfully added your item to cart',
                    });
                    axios
                        .get(
                            `${ProductGetUrl}/${baseProductUrl}/wishlistitemlisting?CustomerID=${
                                loginId > 0 ? loginId : 0
                            }`
                        )
                        .then((response) => {
                            if (
                                response.data &&
                                response.data.ResponseData.length > 0
                            ) {
                                setWishlistItems(response.data.ResponseData);
                                window.location.reload();
                            } else {
                                setWishlistItems(response.data.ResponseData);
                                window.location.reload();
                            }
                        })
                        .catch(() => {
                            return null;
                        });
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseData[0].ID === -1
                ) {
                    notification['error']({
                        message: 'Item Already In Cart!',
                        description: 'Item Already In Cart!',
                    });
                    // setCheckMessage(res.data.ResponseMessage);
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseData[0].ID === -2
                ) {
                    // setCheckMessage(res.data.ResponseMessage);
                }
            })
            .catch((error) => {
                console.log('error occurred', error);
            });
        return true;
        
        e.preventDefault();
        addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
    }

    function handleRemoveWishlistItem(e, product) {
        e.preventDefault();
        // removeItem(product, ecomerce.wishlistItems, 'wishlist');
        axios
            .post(
                `${ProductGetUrl}/${baseProductUrl}/wishlistdelete?ID=${product.ID}`,
                {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            )
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    setWishlistItems(
                        wishlistItems.filter((item) => item.ID != product.ID)
                    );

                    notification['success']({
                        message: 'Item Successfully Deleted!',
                        description: 'You have successfully Deleted Your Item',
                    });

                    // axios
                    //     .get(
                    //         `${ProductGetUrl}/${baseProductUrl}/wishlistitemlisting?CustomerID=${loginId > 0 ? loginId : 0}`
                    //     )
                    //     .then((response) => {
                    //         if (response.data) {
                    //             setWishlistItems(response.data.ResponseData);
                    //         }
                    //     })
                    //     .catch(() => {
                    //         return null;
                    //     });
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseData[0].ID === -1
                ) {
                    // setCheckMessage(res.data.ResponseMessage);
                } else if (
                    res.data.ResponseCode === 'ERROR' &&
                    res.data.ResponseData[0].ID === -2
                ) {
                    // setCheckMessage(res.data.ResponseMessage);
                }
            })
            .catch((error) => {
                console.log('error occurred', error);
            });
    }

    useEffect(() => {
        axios
            .get(
                `${ProductGetUrl}/${baseProductUrl}/wishlistitemlisting?CustomerID=${
                    loginId > 0 ? loginId : 0
                }`
            )
            .then((response) => {
                if (response.data && response.data.ResponseData.length > 0) {
                    setWishlistItems(response.data.ResponseData);
                }
            })
            .catch(() => {
                return null;
            });
        // callback(wishlistItems);
    }, []);
    // views
    let wishlistItemsView;
    if (wishlistItems && wishlistItems.length > 0) {
        wishlistItemsView = (
            <div className="table-responsive">
                <table className="table ps-table--whishlist">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product name</th>
                            <th className="text-right">Unit Price</th>
                            <th>Vendor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlistItems.map((product) => (
                            <tr key={product.ID}>
                                <td>
                                    <a
                                        href="#"
                                        onClick={(e) =>
                                            handleRemoveWishlistItem(e, product)
                                        }>
                                        <i className="icon-cross"></i>
                                    </a>
                                </td>
                                <td>
                                    <ProductCart product={product} />
                                </td>
                                <td className="price text-right">
                                    ${parseFloat(product.UnitPrice).toFixed(2)}
                                </td>
                                <td>{product.SupplierName}</td>
                                <td>
                                    <a
                                        className="ps-btn"
                                        href=""
                                        onClick={(e) =>
                                            handleAddItemToCart(e, product)
                                        }>
                                        Add to cart
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        if (!loading) {
            wishlistItemsView = (
                <div className="alert alert-danger" role="alert">
                    Wishlist is empty!
                </div>
            );
        }
    }
    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Wishlist</h1>
                </div>
                <div className="ps-section__content">{wishlistItemsView}</div>
            </div>
        </div>
    );
};
export default connect((state) => state)(Wishlist);
