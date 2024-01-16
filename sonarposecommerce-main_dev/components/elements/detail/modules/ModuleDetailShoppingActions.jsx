import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import useEcomerce from '~/hooks/useEcomerce';
import axios from 'axios';
import { ProductGetUrl, baseProductUrl } from '~/repositories/Repository';
import { notification } from 'antd';
import { useSelector } from 'react-redux';

const ModuleDetailShoppingActions = ({
    ecomerce,
    product,
    extended = false,
}) => {
    const [quantity, setQuantity] = useState(1);
    const Router = useRouter();
    const { addItem } = useEcomerce();
    const loginId = useSelector((state) => state.auth.loginId);

    const [isAddedWishList, setIsAddedWishList] = useState(
        product.ItemDetails[0].IsAddedWishList > 0 ? true : false
    );

    function handleAddItemToCart(e, product) {
        e.preventDefault();
        const cartItem = {
            ID: 0,
            DeleteID: product.ID,
            CustomerID: loginId > 0 ? loginId : 0,
            ItemID: product.ID,
            Quantity: quantity,
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
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 250);
                    setTimeout(() => {
                        window.location.reload();
                    }, 250);
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
    }

    function handleBuynow(e) {
        e.preventDefault();
        addItem(
            { id: product.id, quantity: quantity },
            ecomerce.cartItems,
            'cart'
        );
        setTimeout(function () {
            Router.push('/account/checkout');
        }, 1000);
    }

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to compare listing!`,
        });
        modal.update;
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        if (loginId > 0) {
            addItem(
                {
                    ID: 0,
                    CustomerID: loginId > 0 ? loginId : 0,
                    ItemID: product.ItemDetails[0].ID,
                    Status: !isAddedWishList ? 'ADD' : 'REMOVE',
                },
                ecomerce.wishlistItems,
                'wishlist'
            );
            setIsAddedWishList(!isAddedWishList);
        }

        // const modal = Modal.success({
        //     centered: true,
        //     title: 'Success!',
        //     content: `This item has been added to your wishlist`,
        // });
        // modal.update;
    };

    function handleIncreaseItemQty(e) {
        e.preventDefault();
        setQuantity(quantity + 1);
    }

    function handleDecreaseItemQty(e) {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    if (!extended) {
        return (
            <div className="ps-product__shopping">
                <figure>
                    <figcaption>Quantity</figcaption>
                    <div className="form-group--number">
                        <button
                            className="up"
                            onClick={(e) => handleIncreaseItemQty(e)}>
                            <i className="fa fa-plus"></i>
                        </button>
                        <button
                            className="down"
                            onClick={(e) => handleDecreaseItemQty(e)}>
                            <i className="fa fa-minus"></i>
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={quantity}
                            disabled
                        />
                    </div>
                </figure>
                <a
                    className="ps-btn ps-btn--black"
                    href="#"
                    onClick={(e) =>
                        handleAddItemToCart(e, product.ItemDetails[0])
                    }>
                    Add to cart
                </a>
                <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
                    Buy Now
                </a>
                <div className="ps-product__actions">
                    {loginId & (loginId > 0) ? (
                        <>
                            <a
                                href="#"
                                onClick={(e) => handleAddItemToWishlist(e)}
                                title={
                                    isAddedWishList == true
                                        ? 'Remove to wishlist'
                                        : 'Add to wishlist'
                                }>
                                {/* <i className={`${product.ItemDetails[0].IsAddedWishList > 0 ? 'icon-heart-fill' : 'icon-heart'}`}></i> */}
                                <i
                                    className={`${
                                        isAddedWishList == true
                                            ? 'icon-heart-fill'
                                            : 'icon-heart'
                                    }`}></i>
                            </a>
                            {/* <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                                <i className="icon-chart-bars"></i>
                            </a> */}
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-product__shopping extend">
                <div className="ps-product__btn-group">
                    <figure>
                        <figcaption>Quantity</figcaption>
                        <div className="form-group--number">
                            <button
                                className="up"
                                onClick={(e) => handleIncreaseItemQty(e)}>
                                <i className="fa fa-plus"></i>
                            </button>
                            <button
                                className="down"
                                onClick={(e) => handleDecreaseItemQty(e)}>
                                <i className="fa fa-minus"></i>
                            </button>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={quantity}
                                disabled
                            />
                        </div>
                    </figure>
                    <a
                        className="ps-btn ps-btn--black"
                        href="#"
                        onClick={(e) =>
                            handleAddItemToCart(e, product.ItemDetails[0])
                        }>
                        Add to cart
                    </a>
                    <div className="ps-product__actions">
                        {loginId & (loginId > 0) ? (
                            <>
                                <a
                                    href="#"
                                    onClick={(e) => handleAddItemToWishlist(e)}
                                    title={
                                        isAddedWishList == true
                                            ? 'Remove to wishlist'
                                            : 'Add to wishlist'
                                    }>
                                    <i
                                        className={`${
                                            isAddedWishList == true
                                                ? 'icon-heart-fill'
                                                : 'icon-heart'
                                        }`}></i>
                                </a>
                            </>
                        ) : (
                            ''
                        )}

                        {/* <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                            <i className="icon-chart-bars"></i>
                        </a> */}
                    </div>
                </div>
                <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
                    Buy Now
                </a>
            </div>
        );
    }
};

export default connect((state) => state)(ModuleDetailShoppingActions);
