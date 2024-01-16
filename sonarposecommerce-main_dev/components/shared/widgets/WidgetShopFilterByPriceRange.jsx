import React, { useEffect, useState } from 'react';
import { Slider, Checkbox } from 'antd';
import { useRouter } from 'next/router';
// import useGetProducts from '~/hooks/useGetProducts';
// import { useSelector } from 'react-redux';

const WidgetShopFilterByPriceRange = ({ callBackMethod  = () => {}  }) => {
    const Router = useRouter();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10000);
    // const { productItems, loading, getProducts } = useGetProducts();
    // const loginId = useSelector((state) => state.auth.loginId);

    function handleChangeRange(value) {
        setMin(value[0]);
        setMax(value[1]);
        const pricePayload = {
            minprice: value[0],
            maxprice: value[1]
        } 
        // console.log("pricePayload ==>", pricePayload);
        callBackMethod(pricePayload);

        /*  const params = {
            price_gt: value[0],
        };*/
        // Router.push(
        //     `/shop/shop-sidebar-without-banner?price_gt=${value[0]}&price_lt=${value[1]}`
        // );
        /*this.props.dispatch(getProductsByPrice(params));*/
       
    }
    // useEffect(() => {
    //     // getProducts(min, max);
    // }, []);

    return (
        <aside className="widget widget_shop">
            <figure>
                <h4 className="widget-title">By Price</h4>
                <Slider
                    range
                    defaultValue={[0, 10000]}
                    max={10000}
                    onAfterChange={(e) => handleChangeRange(e)}
                />
                <p>
                    Price: ${min} - $ {max}
                </p>
            </figure>
        </aside>
    );
};

export default WidgetShopFilterByPriceRange;
