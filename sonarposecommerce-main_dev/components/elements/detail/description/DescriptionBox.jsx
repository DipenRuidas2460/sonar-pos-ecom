import React, { Component } from 'react';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

import PartialDescription from './PartialDescription';
import PartialSpecification from './PartialSpecification';
import PartialVendor from './PartialVendor';
import PartialReview from './PartialReview';
import PartialOffer from './PartialOffer';

class DescriptionBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const product = this.props.product;
        return (
            <div className="ps-product__box">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Description" key="1">
                        <PartialDescription product={product} />
                    </TabPane>
                    <TabPane tab="Specification" key="2">
                        <PartialSpecification product={product} />
                    </TabPane>
                    <TabPane tab="Vendor" key="3">
                        <PartialVendor product={product} />
                    </TabPane>
                    <TabPane tab="Reviews" key="4">
                        <PartialReview product={product} />
                    </TabPane>
                    {/* <TabPane tab="Questions and Answers" key="5">
                        Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="More Offers" key="6">
                        <PartialOffer />
                    </TabPane> */}
                </Tabs>
            </div>
        );
    }
}

export default DescriptionBox;
