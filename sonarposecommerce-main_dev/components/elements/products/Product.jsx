import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProductList from '~/hooks/useProductLisitng';
import Rating from '~/components/elements/Rating';

const Product = ({ product }) => {
    const { thumbnailImage, price, badge, title } = useProductList();
    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <Link
                    href="/product/boxed/[pid]"
                    as={`/product/boxed/${product.ItemID}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
                {badge(product)}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">Young Shop</a>
                </Link>
                <div className="ps-product__content">
                    {title(product)}
                    <div className="ps-product__rating">
                        <Rating product={product}  />
                        <span>{product.RatingsCount}</span>
                    </div>
                    {price(product)}
                </div>
                <div className="ps-product__content hover">
                    {title(product)}
                    {price(product)}
                </div>
            </div>
        </div>
    );
};

export default Product;
