import React, { useState, useEffect } from 'react';
// import useGetProducts from '~/hooks/useGetProducts';
let UpdateDataForBarcodeGeneration;

// update user permission data by login user id
export function updateDataForBarcodeGeneration(p_barcodedata) {
    UpdateDataForBarcodeGeneration = p_barcodedata;
}

// useEffect(() => {
//     GetDataForBarcodeGeneration();
// }, []);

// return only list of user permission data
export function GetDataForBarcodeGeneration() {
    return UpdateDataForBarcodeGeneration;
}

const ModuleShopSortBy = ({ callBackMethod  = () => {} }) => {
    const [selectedValue, setSelectedValue] = useState('');
    // const { getProducts } = useGetProducts();

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        // do something with the selected value
        updateDataForBarcodeGeneration(event.target.value);

        callBackMethod(event.target.value);
        // getProducts({
        //     Page: 1,
        //     PageSize: 12,
        //     PriceOrder: parseInt(event.target.value),
        // });
    };

    return (
        <select
            className="ps-select form-control"
            data-placeholder="Sort Items"
            onChange={handleSelectChange}
            value={selectedValue}>
            <option value="">Sort by</option>
            {/* <option value={true}>Sort by latest</option>
            <option value="popularity">Sort by popularity</option>
            <option value="rating">Sort by average rating</option> */}
            <option value="0">Sort by price: low to high</option>
            <option value="1">Sort by price: high to low</option>
        </select>
    );
};

export default ModuleShopSortBy;
