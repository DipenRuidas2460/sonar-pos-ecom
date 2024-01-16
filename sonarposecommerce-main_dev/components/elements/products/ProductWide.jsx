import React from 'react';
import Link from 'next/link';
import { StrapiProductThumbnail } from '~/utilities/product-helper';
import ModuleProductWideActions from '~/components/elements/products/modules/ModuleProductWideActions';
import useProduct from '~/hooks/useProduct';

const ProductWide = ({ product }) => {
    const { thumbnailImage, price, title, badge } = useProduct();
    return (
        <div className="ps-product ps-product--wide">
            <div className="ps-product__thumbnail">
                <Link href="/product/boxed/[pid]" as={`/product/boxed/${product.id}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            <div className="ps-product__container">
                <div className="ps-product__content">
                    {title(product)}
                    {/* <p className="ps-product__vendor">
                        Sold by:
                        <Link href="/shop">
                            <a>{product.vendor}</a>
                        </Link>
                    </p> */}
                    <div className="ps-product__desc">
                        <p>{product.Description}</p>
                    </div>
                </div>
                <ModuleProductWideActions product={product} />
            </div>
        </div>
    );
};

export default ProductWide;
