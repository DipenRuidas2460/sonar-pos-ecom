import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';

const WidgetShopCategories = ({ callBackMethod = () => {} }) => {
    const Router = useRouter();
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(false);

    const { slug } = Router.query;

    async function getCategories(pCategoryID) {
        setLoading(true);
        const responseData = await ProductRepository.getProductCategories(
            pCategoryID
        );
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

    async function handleClickCategory(pCategoryID) {
        // console.log("pCategoryID ==>", pCategoryID);

        await getCategories(pCategoryID);
        callBackMethod(pCategoryID);
    }

    useEffect(() => {
        getCategories(slug);
    }, [slug]);

    // Views
    let categoriesView;
    if (!loading) {
        if (categories && categories.length > 0) {
            const items = categories.map((item) => (
                <li key={item.ID} className={item.ID === slug ? 'active' : ''}>
                    {/* <Link href={`/category/${item.ID}`}>{item.Name}</Link> */}
                    <Link href="">
                        <a onClick={(e) => handleClickCategory(item.ID)}>
                            {' '}
                            {item.Name}
                        </a>
                    </Link>
                </li>
            ));
            categoriesView = <ul className="ps-list--categories">{items}</ul>;
        } else {
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Categories</h4>
            {categoriesView}
        </aside>
    );
};

export default WidgetShopCategories;
