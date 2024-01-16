import React from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { Result } from 'antd';
import ProductCart from '~/components/elements/products/ProductCart';
import axios from 'axios';
import { ProductGetUrl, baseProductUrl } from '~/repositories/Repository';
import { notification } from 'antd';
import { useSelector } from 'react-redux';

const ModuleEcomerceCartItems = ({ ecomerce, cartItems }) => {
    const { increaseQty, decreaseQty, removeItem } = useEcomerce();
    const loginId = useSelector((state) => state.auth.loginId);

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
                    notification['success']({
                        message: 'Item Successfully Deleted!',
                        description: 'You have successfully Deleted Your Item',
                    });
                    // window.location.reload();
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                    // axios
                    //     .get(
                    //         `${ProductGetUrl}/${baseProductUrl}/cartitemlisting?CustomerID=${loginId}`
                    //     )
                    //     .then((response) => {
                    //         if (response.data) {
                    //             // setCartItems(response.data.ResponseData);
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
        // removeItem({ id: productId }, ecomerce.cartItems, 'cart');
    }

    function handleIncreaseItemQty(e, product, ADD) {
        e.preventDefault();
        const add = {
            ID: product.ID,
            Query: ADD,
        };
        axios
            .post(`${ProductGetUrl}/${baseProductUrl}/quantitymanage`, add, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    // notification['success']({
                    //     message: 'Item Successfully Deleted!',
                    //     description: 'You have successfully Deleted Your Item',
                    // });
                    window.location.reload();
                    axios
                        .get(
                            `${ProductGetUrl}/${baseProductUrl}/cartitemlisting?CustomerID=${
                                loginId > 0 ? loginId : 0
                            }`
                        )
                        .then((response) => {
                            if (
                                response.data &&
                                response.data.ResponseData.length > 0
                            ) {
                                setProducts(response.data.ResponseData);
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
        // increaseQty({ id: productId }, ecomerce.cartItems);
    }

    function handleDecreaseItemQty(e, product, SUB) {
        e.preventDefault();
        const sub = {
            ID: product.ID,
            Query: SUB,
        };
        axios
            .post(`${ProductGetUrl}/${baseProductUrl}/quantitymanage`, sub, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    window.location.reload();

                    // notification['success']({
                    //     message: 'Item Successfully Deleted!',
                    //     description: 'You have successfully Deleted Your Item',
                    // });
                    axios
                        .get(
                            `${ProductGetUrl}/${baseProductUrl}/cartitemlisting?CustomerID=${
                                loginId > 0 ? loginId : 0
                            }`
                        )
                        .then((response) => {
                            if (
                                response.data &&
                                response.data.ResponseData.length > 0
                            ) {
                                setProducts(response.data.ResponseData);
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
        // decreaseQty({ id: productId }, ecomerce.cartItems);
    }

    // View
    let cartItemsViews;
    if (cartItems && cartItems.length > 0) {
        const items = cartItems.map((item) => (
            <tr key={item.ID}>
                <td>
                    <ProductCart product={item} />
                </td>
                <td data-label="price" className="price">
                    ${parseFloat(item.price).toFixed(2)}
                </td>
                <td data-label="quantity">
                    <div className="form-group--number">
                        <button
                            className="up"
                            onClick={(e) =>
                                handleIncreaseItemQty(e, item, 'ADD')
                            }>
                            +
                        </button>
                        <button
                            className="down"
                            onClick={(e) =>
                                handleDecreaseItemQty(e, item, 'SUB')
                            }>
                            -
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={item.quantity}
                            disabled={true}
                        />
                    </div>
                </td>
                <td data-label="total">
                    {/* <strong>${(item.price * item.quantity).toFixed(2)}</strong> */}
                    <strong>${parseFloat(item.price).toFixed(2)}</strong>
                </td>
                <td>
                    <a href="#" onClick={(e) => handleRemoveItem(e, item)}>
                        <i className="icon-cross"></i>
                    </a>
                </td>
            </tr>
        ));

        cartItemsViews = (
            <>
                <table className="table  ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </>
        );
    } else {
        cartItemsViews = (
            <Result status="warning" title="No product in cart." />
        );
    }
    return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);
