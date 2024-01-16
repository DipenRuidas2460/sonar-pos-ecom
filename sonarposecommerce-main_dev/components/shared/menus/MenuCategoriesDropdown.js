import React, { useEffect, useState } from 'react';
// import menuData from '~/public/static/data/menu.json';
// import Menu from '~/components/elements/menu/Menu';
import ProductRepository from '~/repositories/ProductRepository';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import CryptoJS from "crypto-js";

// import { encryptData,decryptData } from '~/utilities/common-helpers';

const MenuCategoriesDropdown = () => {
    const Router = useRouter();
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = Router.query;

    async function getCategories() {
        setLoading(true);
        const responseData = await ProductRepository.getProductCategories(slug);
        if (responseData) {
            setCategories(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    // Views
    let categoriesView;
    if (!loading) {
        if (categories && categories.length > 0) {
            const items = categories.map((item) => (
                <li key={item.ID} className={item.ID === slug ? 'active' : ''}>
                    {/* <Link href={`/category/${item.ID}`}>{item.Name}</Link> */}
                    {/* <Link href={`/shop/shop-sidebar-without-banner?${encryptData("cid=" + item.ID)}`}>{item.Name}</Link> */}
                    {/* <Link href={`/shop/shop-sidebar-without-banner?query=${encryptData(item.ID)}`}>{item.Name}</Link> */}
                    <Link href={`/shop/shop-sidebar-without-banner?query=${item.ID}&name=${item.Name}`}>{item.Name}</Link>
                </li>
            ));
            categoriesView = <ul className="ps-list--categories">{items}</ul>;
        } else {
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }
    useEffect(() => {
        getCategories();
    }, [slug]);
    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i className="icon-menu"></i>
                <span>Shop by Categories</span>
            </div>
            <div className="menu__content">
                <aside className="widget widget_shop">{categoriesView}</aside>
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;
