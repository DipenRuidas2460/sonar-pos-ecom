import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import axios from 'axios';
import { ProductGetUrl, baseProductUrl } from '~/repositories/Repository';
import { notification } from 'antd';
import { useSelector } from 'react-redux';

const MiniCart = ({ ecomerce }) => {
    const { products, removeItem, removeItems, getProducts } = useEcomerce();
    const [cartItems, setCartItems] = useState([]);
    // const loginId = useSelector((state) => state.auth.loginId); // get the loginId from the Redux store
    const loginId = 14;
    // const loginId = useSelector((state) => state.auth.loginId);

    function handleRemoveItem(e, productId) {
        e.preventDefault();
        axios
            .post(
                `${ProductGetUrl}/${baseProductUrl}/cartdelete?ID=${productId.ID}`,
                {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            )
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    // console.log('ssuuucccceeessss');
                    notification['success']({
                        message: 'Item Successfully Deleted!',
                        description: 'You have successfully Deleted Your Item',
                    });
                    // window.location.reload();
                    axios
                        .get(
                            `${ProductGetUrl}/${baseProductUrl}/cartitemlisting?CustomerID=${
                                loginId > 0 ? loginId : 0
                            }`
                        )
                        .then((response) => {
                            if (response.data) {
                                // console.log(
                                //     'attributes ===>>',
                                //     response.data.ResponseData
                                // );
                                setCartItems(response.data.ResponseData);
                            }
                        })
                        .catch(() => {
                            return null;
                        });
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
        return true;
        removeItem({ id: productId }, ecomerce.cartItems, 'cart');
    }

    useEffect(() => {
        axios
            .get(
                `${ProductGetUrl}/${baseProductUrl}/cartitemlisting?CustomerID=${
                    loginId > 0 ? loginId : 0
                }`
            )
            .then((response) => {
                if (response.data && response.data.ResponseData.length > 0) {
                    // console.log('attributes ===>>', response.data.ResponseData);
                    setCartItems(response.data.ResponseData);
                }
            })
            .catch(() => {
                return null;
            });
    }, []);

    let cartItemsView;
    if (cartItems && cartItems.length > 0) {
        const amount = calculateAmount(cartItems);
        const productItems = cartItems.map((item) => {
            return (
                <ProductOnCart product={item} key={item.ID}>
                    <a
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveItem(e, item)}>
                        <i className="icon-cross"></i>
                    </a>
                </ProductOnCart>
            );
        });
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">{productItems}</div>
                <div className="ps-cart__footer">
                    <h3>
                        Sub Total:
                        <strong>${amount ? amount : 0}</strong>
                    </h3>
                    <figure>
                        <Link href="/account/shopping-cart">
                            <a className="ps-btn">View Cart</a>
                        </Link>
                        <Link href="/account/checkout">
                            <a className="ps-btn">Checkout</a>
                        </Link>
                    </figure>
                </div>
            </div>
        );
    } else {
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">
                    <span>No products in cart</span>
                </div>
            </div>
        );
    }

    return (
        cartItems,
        setCartItems,
        (
            <div className="ps-cart--mini">
                <a className="header__extra" href="/account/shopping-cart">
                    <i className="icon-bag2"></i>
                    <span>
                        <i>{cartItems ? cartItems.length : 0}</i>
                    </span>
                </a>
                {cartItemsView}
            </div>
        )
    );
};

export default connect((state) => state)(MiniCart);
