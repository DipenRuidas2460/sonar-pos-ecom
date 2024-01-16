import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const ModuleProductDetailSpecification = (product) => {
    const [categories, setcategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setcategories(product.product.ItemCategoriesList);
        setTags(product.product.TagsList);
    }, [product]);

    return (
        <>
            <div className="ps-product__specification">
                {/* <Link href="/page/blank">
                    <a className="report">Report Abuse</a>
                </Link>
                <p>
                    <strong>SKU:</strong> SF1133569600-1
                </p> */}
                <p className="categories">
                    {categories.length > 0 ? <></> : ""}
                    <strong> Categories:</strong>
                    
                    <Link href={`/shop/shop-sidebar-without-banner?query=${product.product.ItemDetails[0].CategoryId}&name=${product.product.ItemDetails[0].CategoryName}`}>
                        <a>{product.product.ItemDetails[0].CategoryName}</a>
                    </Link>

                    {categories?.map((item) => {
                        return (
                            <>
                                <Link href={`/shop/shop-sidebar-without-banner?query=${item.CategoryId}&name=${item.CategoryName}`}>
                                    <a>{item.CategoryName}</a>
                                </Link>
                            </>
                        );
                    })}
                    {/* 
                    <Link href="/shop">
                        <a>Refrigerator</a>
                    </Link>
                    <Link href="/shop">
                        <a>Babies & Moms</a>
                    </Link> */}
                </p>
                <p className="tags">
                    {tags.length > 0 ? <>
                        <strong> Tags</strong>
                        {tags?.map((item) => {
                            return (
                                <>
                                    <Link href="#">
                                        <a>{item.TagName}</a>
                                    </Link>
                                </>
                            );
                        })}
                    </> : ""}



                    {/* <Link href="/shop">
                        <a>sofa</a>
                    </Link>
                    <Link href="/shop">
                        <a>technologies</a>
                    </Link>
                    <Link href="/shop">
                        <a>wireless</a>
                    </Link> */}
                </p>
            </div>
        </>
    );
};

export default ModuleProductDetailSpecification;
