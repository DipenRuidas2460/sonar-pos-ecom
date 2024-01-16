import React from 'react';
import Link from 'next/link';
import { calculateAmount } from '~/utilities/ecomerce-helpers';

const ModuleCartSummary = ({ source }) => {
    // View
    let productItemsView, amount;
    if (source && source.length > 0) {
        amount = calculateAmount(source);
        productItemsView = source.map((item) => (
            <li key={item.ID}>
                <span className="ps-block__estimate">
                    <Link
                        href="/product/boxed/[pid]"
                        as={`/product/boxed/${item.ItemID}`}>
                        <a className="ps-product__title">
                            {item.ItemName}
                            <br /> x {item.quantity}
                        </a>
                    </Link>
                </span>
            </li>
        ));
    }
    // const myNewComponent = () => (
    //     <>
    //         <div className="ps-block--shopping-total">
    //             <div className="ps-block__header">
    //                 <p>
    //                     Subtotal <span> ${amount}</span>
    //                 </p>
    //             </div>
    //             <div className="ps-block__content">
    //                 <ul className="ps-block__product">{productItemsView}</ul>
    //                 <h3>
    //                     Total <span>${amount}</span>
    //                 </h3>
    //             </div>
    //         </div>
    //     </>
    // );

    // const myPassingAmount = amount;
    // console.log('myPassingAmount::>', myPassingAmount);

    // return { myNewComponent, myPassingAmount };

    return (
        <>
            {amount}
            <>
                <div className="ps-block--shopping-total">
                    <div className="ps-block__header">
                        <p>
                            Subtotal <span> ${amount}</span>
                        </p>
                    </div>
                    <div className="ps-block__content">
                        <ul className="ps-block__product">
                            {productItemsView}
                        </ul>
                        <h3>
                            Total <span>${amount}</span>
                        </h3>
                    </div>
                </div>
            </>
        </>
    );
};

export default ModuleCartSummary;
