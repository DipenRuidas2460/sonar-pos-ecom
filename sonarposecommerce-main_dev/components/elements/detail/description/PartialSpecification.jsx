import React from 'react';

const PartialSpecification = ({ product }) => {
    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered ps-table ps-table--specification">
                    <tbody>
                        {product.AttributesList?.map((item) => {
                            return (
                                <>
                                    <tr key={item.ID}>
                                        <td>{item.Attributename}</td>
                                        <td>{item.Attributevaluename}</td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                    {/* <tbody>
                        {product.AttributesList?.map((item) => {
                            return (
                                <>
                                    <tr key={item.ID}>
                                        <td>{item.Attributename}</td>
                                        <td>{item.Attributevaluename}</td>
                                    </tr>
                                </>
                            );
                        })} */}
                    {/* <tr>
                <td>Color</td>
                <td>Black, Gray</td>
            </tr>
            <tr>
                <td>Style</td>
                <td>Ear Hook</td>
            </tr>
            <tr>
                <td>Wireless</td>
                <td>Yes</td>
            </tr>
            <tr>
                <td>Dimensions</td>
                <td>5.5 x 5.5 x 9.5 inches</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>6.61 pounds</td>
            </tr>
            <tr>
                <td>Battery Life</td>
                <td>20 hours</td>
            </tr>
            <tr>
                <td>Bluetooth</td>
                <td>Yes</td>
            </tr> */}
                    {/* </tbody> */}
                </table>
            </div>
        </>
    );
};

export default PartialSpecification;
