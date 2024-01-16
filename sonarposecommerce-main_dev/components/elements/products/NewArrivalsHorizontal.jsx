import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
// import useProduct from '~/hooks/useProduct';
import useNewArrival from '~/hooks/useNewArrival';

const NewArrivalHorizontal = ({ product }) => {
    const { thumbnailImage, price, title } = useNewArrival();
    return (
        <div className="ps-product--horizontal">
            <div className="ps-product__thumbnail">
                <Link
                    href="/product/boxed/[pid]"
                    as={`/product/boxed/${product.ID}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product)}
                <div className="ps-product__rating">
                    <Rating product={product} />
                </div>
                {price(product)}
            </div>
        </div>
    );
};

export default NewArrivalHorizontal;
