import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import ChangePassword from '~/components/partials/account/ChangePassword';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'ChangPassword',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="ChangePassword">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <ChangePassword />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default MyAccountPage;
