import React, { useState } from 'react';
import WidgetProductSameBrands from '~/components/shared/widgets/WidgetProductSameBrands';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing';
import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile';
import DescriptionBox from '~/components/elements/detail/description/DescriptionBox';
import Item from 'antd/lib/list/Item';

const ProductDetailBox = ({ product }) => {
    const [quantity, setQuantity] = useState(
        product.VaraiationsList.map(() => 1)
    );
    function handleAddItemToCart(e, index, item) {
        e.preventDefault();
        console.log('Clicked item index:', index);
        console.log('Clicked item data:', item);
        console.log('Quantity of ParticularItem', quantity[index]);
        // const cartItem = {
        //     ID: 0,
        //     DeleteID: product.ID,
        //     CustomerID: loginId > 0 ? loginId : 0,
        //     ItemID: product.ID,
        //     Quantity: quantity,
        // };
    }

    function handleIncreaseItemQty(e, index, item) {
        // e.preventDefault();
        // setQuantity(quantity + 1);
        e.preventDefault();
        const newQuantities = [...quantity];
        newQuantities[index] += 1;
        console.log(newQuantities);
        setQuantity(newQuantities);
    }

    function handleDecreaseItemQty(e, index, item) {
        // e.preventDefault();
        // if (quantity > 1) {
        //     setQuantity(quantity - 1);
        // }
        e.preventDefault();
        const newQuantities = [...quantity];
        newQuantities[index] -= 1;
        if (newQuantities[index] < 1) {
            newQuantities[index] = 1;
        }
        setQuantity(newQuantities);
    }

    return (
        <>
            <div className="ps-product--detail ps-product--box">
                <div className="ps-product__header ps-product__box">
                    <ThumbnailDefault product={product} vertical={false} />
                    <div className="ps-product__info">
                        <ModuleDetailTopInformation product={product} />
                        <ModuleProductDetailSpecification product={product} />
                        <ModuleProductDetailDescription product={product} />
                        <ModuleDetailShoppingActions product={product} />
                        {/* <h2>Item Variations</h2> */}
                        {product.VaraiationsList.length > 0 && (
                            <div>
                                <div
                                    className="mb-4"
                                    style={{
                                        borderBottom: '1px solid #e1e1e1',
                                        // border: '1px solid #e1e1e1',
                                    }}>
                                    <h2>Item Variations</h2>
                                </div>
                                <div
                                    className="row mb-4"
                                    style={{ color: 'black' }}>
                                    <div className="col-md-2">Image</div>
                                    <div
                                        className="col-md-3"
                                        // style={{ textAlign: 'center' }}
                                    >
                                        ItemName
                                    </div>
                                    <div
                                        className="col-md-2"
                                        // style={{ textAlign: 'center' }}
                                    >
                                        UnitPrice
                                    </div>
                                    <div
                                        className="col-md-2"
                                        // style={{ textAlign: 'center' }}
                                    >
                                        Quantity
                                    </div>
                                    <div className="col-md-3">Add to Cart</div>
                                </div>
                                {product.VaraiationsList.map((item, index) => (
                                    <>
                                        <div
                                            key={index}
                                            className="row mb-4 ms-2">
                                            <div className="col-md-2">
                                                <img
                                                    style={{ height: '50px' }}
                                                    className="img-fluid"
                                                    src={item.Image}></img>
                                            </div>
                                            <div className="col-md-3 mt-4">
                                                <h6>{item.Name}</h6>
                                            </div>
                                            <div className="col-md-2 mt-4">
                                                <h6>
                                                    {parseFloat(
                                                        item.UnitPrice
                                                    ).toFixed(2)}
                                                </h6>
                                            </div>
                                            <div className="col-md-2 ps-product__btn-group">
                                                <figure>
                                                    <div className="form-group--number">
                                                        <button
                                                            className="up"
                                                            onClick={(e) =>
                                                                handleIncreaseItemQty(
                                                                    e,
                                                                    index,
                                                                    item
                                                                )
                                                            }>
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                        <button
                                                            className="down"
                                                            onClick={(e) =>
                                                                handleDecreaseItemQty(
                                                                    e,
                                                                    index,
                                                                    item
                                                                )
                                                            }>
                                                            <i className="fa fa-minus"></i>
                                                        </button>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder={
                                                                quantity[index]
                                                            }
                                                            disabled
                                                        />
                                                    </div>
                                                </figure>
                                            </div>
                                            <div className="col-md-3 mt-2">
                                                <a
                                                    className="ps-btn"
                                                    style={{ padding: '5px' }}
                                                    href="#"
                                                    onClick={(e) =>
                                                        handleAddItemToCart(
                                                            e,
                                                            index,
                                                            item
                                                        )
                                                    }>
                                                    Add to cart
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        )}
                        {/* <ModuleProductDetailSharing /> */}
                        <ModuleDetailActionsMobile
                            product={product.ItemDetails[0]}
                        />
                    </div>
                </div>
                <div className="ps-product__content">
                    <div className="row">
                        <div className="col-xl-12">
                            <DescriptionBox product={product} />
                        </div>
                        {/* <div className="col-xl-3">
                    <div className="ps-product__box">
                        <WidgetProductSameBrands collectionSlug="shop-same-brand" />
                    </div>
                </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailBox;
