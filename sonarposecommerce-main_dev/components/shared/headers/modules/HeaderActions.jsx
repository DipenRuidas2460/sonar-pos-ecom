import React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import axios from 'axios';
import { ProductGetUrl, baseProductUrl } from '~/repositories/Repository';
import AccountQuickLinks from '~/components/shared/headers/modules/AccountQuickLinks';
import Wishlist from '~/components/partials/account/Wishlist';

import { useSelector } from 'react-redux';

const HeaderActions = ({ ecomerce, auth }) => {
    const { compareItems } = ecomerce;
    // const { wishlistItems } = Wishlist;
    const [wishlistItems, setWishlistItems] = useState([]);
    
    const loginId = useSelector((state) => state.auth.loginId);
    // const headerBadgeCount = useSelector(state => state.headerBadgeCount);
    

    // views
    let headerAuthView;
    if (auth.isLoggedIn && Boolean(auth.isLoggedIn) === true) {
        headerAuthView = <AccountQuickLinks isLoggedIn={true} />;
    } else {
        headerAuthView = <AccountQuickLinks isLoggedIn={false} />;
    }
    useEffect(() => {
        axios
            .get(
                `${ProductGetUrl}/${baseProductUrl}/wishlistitemlisting?CustomerID=${loginId > 0 ? loginId : 0}`
            )
            .then((response) => {
                if (response.data && response.data.ResponseData.length > 0) {
                    setWishlistItems(response.data.ResponseData);
                }
            })
            .catch(() => {
                return null;
            });
        // callback(wishlistItems);
    }, []);
    return (
        <>
            <div className="header__actions">
                {/* <Link href="/account/compare">
                    <a className="header__extra">
                        <i className="icon-chart-bars"></i>
                        <span>
                            <i>{compareItems ? compareItems.length : 0}</i>
                        </span>
                    </a>
                </Link> */}
                <Link href="/account/wishlist">
                    <a className="header__extra">
                        <i className="icon-heart"></i>
                        <span>
                            <i>{wishlistItems ? wishlistItems.length : 0}</i>
                        </span>
                    </a>
                </Link>
                <MiniCart />
                {headerAuthView}
            </div>
            {/* <Wishlist callback={callback} /> */}
        </>
    );
};

export default connect((state) => state)(HeaderActions);
