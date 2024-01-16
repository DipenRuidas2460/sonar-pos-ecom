import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';
import EditShippingAddress from '~/components/partials/account/EditShippingAddress';

const EditAddressPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Edit address',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Edit Address">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <EditShippingAddress />
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

export default EditAddressPage;
