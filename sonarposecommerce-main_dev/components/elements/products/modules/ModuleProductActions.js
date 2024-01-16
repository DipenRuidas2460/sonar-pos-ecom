import React, { useState } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import useEcomerce from '~/hooks/useEcomerce';
import axios from 'axios';
import { notification } from 'antd';
import { ProductGetUrl, baseProductUrl } from '~/repositories/Repository';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const ModuleProductActions = ({ product, ecomerce }) => {
    const loginId = useSelector((state) => state.auth.loginId);
    // console.log("product =>>", product);
    // console.log("IsAddedWishList =>>", product.IsAddedWishList);
    const [isQuickView, setIsQuickView] = useState(false);
    const { addItem } = useEcomerce();

    const [isAddedWishList, setIsAddedWishList] = useState(product.IsAddedWishList > 0 ? true : false);

    //console.log("ModuleProductActions ecomerce ==> ", ecomerce);

    function handleAddItemToCart(e, product) {
        e.preventDefault();
        // return true;
        const cartItem = {
            ID: 0,
            // DeleteID: product.ID,
            CustomerID: 1,
            // ItemID: product.ID,
            ItemID: product.ItemID ? product.ItemID : product.ID,
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
        // addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        if (loginId > 0) {
            addItem(
                { ID: 0, CustomerID: loginId > 0 ? loginId : 0, ItemID: product.ItemID, Status: !isAddedWishList ? "ADD" : "REMOVE" },
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
    }

    function handleAddItemToCompare(e) {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to your compare listing!`,
        });
        modal.update;
    }

    const handleShowQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(true);
    };

    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false);
    };
    return (
        <ul className="ps-product__actions">
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add To Cart"
                    onClick={(e) => handleAddItemToCart(e, product)}>
                    <i className="icon-bag2"></i>
                </a>
            </li>
            <li>
                <Link
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Quick View"
                    href="/product/boxed/[pid]"
                    as={`/product/boxed/${product.ItemID}`}>
                    <a><i className="icon-eye"></i></a>
                </Link>
                {/* <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Quick View"
                    onClick={handleShowQuickView}>
                    <i className="icon-eye"></i>
                </a> */}
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={isAddedWishList == true ? "Remove to wishlist" : "Add to wishlist"}
                    onClick={handleAddItemToWishlist}>
                    {/* <i className="icon-heart"></i> */}
                    <i className={`${isAddedWishList == true ? 'icon-heart-fill-small' : 'icon-heart'}`}></i>
                </a>
            </li>
            {/* <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                    onClick={handleAddItemToCompare}>
                    <i className="icon-chart-bars"></i>
                </a>
            </li> */}
            <Modal
                centered
                footer={null}
                width={1024}
                onCancel={(e) => handleHideQuickView(e)}
                visible={isQuickView}
                closeIcon={<i className="icon icon-cross2"></i>}>
                <h3>Quickview</h3>
                <ProductDetailQuickView product={product} />
            </Modal>
        </ul>
    );
};

export default connect((state) => state)(ModuleProductActions);
