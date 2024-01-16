import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { useRouter } from 'next/router';

const ModuleDetailActionsMobile = ({ ecomerce, product }) => {
    const { addItem } = useEcomerce();
    const Router = useRouter();
    const handleAddItemToCart = (e, product) => {
        e.preventDefault();
        // addItem(
        //     { id: product.ItemDetails[0].ID, quantity: 1 },
        //     ecomerce.cartItems,
        //     'cart'
        // );
        const cartItem = {
            ID: 0,
            // DeleteID: product.ID,
            CustomerID: 1,
            ItemID: product.ID,
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
        // Router.push('/account/shopping-cart');
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
        Router.push('/account/checkout');
    };

    return (
        <div className="ps-product__actions-mobile">
            <a
                className="ps-btn ps-btn--black"
                href="#"
                onClick={(e) => handleAddItemToCart(e, product)}>
                Add to cart
            </a>
            <a className="ps-btn" href="#" onClick={(e) => handleBuyNow(e)}>
                Buy Now
            </a>
        </div>
    );
};

export default connect((state) => state)(ModuleDetailActionsMobile);
