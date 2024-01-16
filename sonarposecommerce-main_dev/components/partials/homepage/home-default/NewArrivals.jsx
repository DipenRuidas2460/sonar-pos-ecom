import React, { useEffect } from 'react';
import Link from 'next/link';
import NewArrivalHorizontal from '~/components/elements/products/NewArrivalsHorizontal';
import useGetNewArrivals from '~/hooks/useGetNewArrival';

const NewArrivals = ({ collectionSlug }) => {
    const {
        NewArrivalsItems,
        loading,
        getNewArrivalsByCollection,
    } = useGetNewArrivals();
    useEffect(() => {
        getNewArrivalsByCollection(collectionSlug);
    }, [collectionSlug]);

    // Views
    let productItemView;
    if (!loading) {
        if (NewArrivalsItems && NewArrivalsItems.length > 0) {
            productItemView = NewArrivalsItems.map((item) => (
                <div
                    className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 "
                    key={item.id}>
                    <NewArrivalHorizontal product={item} />
                </div>
            ));
        } else {
            productItemView = <p>No product found.</p>;
        }
    } else {
        productItemView = <p>Loading...</p>;
    }
    return (
        <div className="ps-product-list ps-new-arrivals">
            <div className="ps-container">
                <div className="ps-section__header">
                    <h3>Hot New Arrivals</h3>
                    {/* <ul className="ps-section__links">
                        <li>
                            <Link href="/shop">
                                <a>Technologies</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>Electronic</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>Furnitures</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>Clothing & Apparel</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop?category=health-and-beauty">
                                <a>Health & Beauty</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>View All</a>
                            </Link>
                        </li>
                    </ul> */}
                </div>
                <div className="ps-section__content">
                    <div className="row">{productItemView}</div>
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;
