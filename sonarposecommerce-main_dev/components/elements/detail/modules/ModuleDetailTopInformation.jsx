import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';

const ModuleDetailTopInformation = ({ product }) => {
    // Views
    let priceView;

    if (product.ItemDetails) {
        priceView = (
            <h4 className="ps-product__price sale">
                <del className="mr-2">
                    ${parseFloat(product.ItemDetails[0]?.Price).toFixed(2)}
                </del>
                ${parseFloat(product.ItemDetails[0]?.PromoPrice).toFixed(2)}
            </h4>
        );
    } else {
        priceView = (
            <h4 className="ps-product__price">
                ${product.ItemDetails[0]?.Price}
            </h4>
        );
    }
    return (
        <header>
            <h1>{product.ItemDetails[0]?.Name}</h1>
            <div className="ps-product__meta">
                <p>
                    Brand:
                    <Link href={`/brand/${product.ItemDetails[0]?.BrandId}`}>
                        <a className="ml-2 text-capitalize">
                            {product.ItemDetails[0]?.BrandName}
                        </a>
                    </Link>
                </p>
                <div className="ps-product__rating">
                    <Rating product={product.ItemAverageRating[0]} />
                    <span>({product.ItemRatingsCount[0].RatingsCount} review(s))</span>
                </div>
            </div>
            {priceView}
        </header>
    );
};

export default ModuleDetailTopInformation;
