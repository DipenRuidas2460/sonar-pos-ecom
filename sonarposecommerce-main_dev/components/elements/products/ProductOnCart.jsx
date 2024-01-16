import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';

const ProductOnCart = ({ product, children }) => {
    const { thumbnailImage, title } = useProduct();

    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link
                    href="/product/boxed/[pid]"
                    as={`/product/boxed/${product.ItemID}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product)}
                <p>
                    <small>
                        ${parseFloat(product.price).toFixed(2)}x
                        {product.quantity}
                    </small>
                </p>{' '}
                {children}
            </div>
        </div>
    );
};

export default ProductOnCart;
