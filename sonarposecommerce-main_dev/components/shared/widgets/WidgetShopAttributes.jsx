// import React, { useEffect, useState } from 'react';
// import ProductRepository from '~/repositories/ProductRepository';
// import Link from 'next/link';
// import { Checkbox } from 'antd';
// import { Radio, Input } from 'antd';
// import { useRouter } from 'next/router';

// const WidgetShopAttributes = () => {
//     const Router = useRouter();
//     const { slug } = Router.query;
//     const [brands, setBrands] = useState(null);
//     const [loading, setLoading] = useState(false);

//     async function getCategories() {
//         setLoading(true);
//         const responseData = await ProductRepository.getAttributes();
//         if (responseData) {
//             console.log('responseData::>>', responseData.ParentAttribute);
//             console.log('responseData::>>', responseData.ChildAttribute);
//             let brandsGroup = [];
//             if (responseData.length > 0) {
//                 responseData.forEach((brand) => {
//                     brandsGroup.push({
//                         id: brand.ID,
//                         value: brand.ID,
//                         label: brand.Name,
//                     });
//                 });
//             }
//             setBrands(brandsGroup);

//             setTimeout(
//                 function () {
//                     setLoading(false);
//                 }.bind(this),
//                 250
//             );
//         }
//     }

//     function handleSelectBrand(e) {
//         const myString = e.join(', ');
//         console.log('attribute event:>>', myString);
//         // Router.push(`/attributes/${e.target.value}`);
//     }

//     useEffect(() => {
//         getCategories();
//     }, []);

//     // Views
//     let brandsView;
//     if (!loading) {
//         if (brands && brands.length > 0) {
//             const items = brands.map((item) => (
//                 <li key={item.ID}>
//                     {/* <Link href={`shop/${item.slug}`}>{item.name}</Link> */}
//                     <Link href={`/attributes/${item.ID}`}>{item.Name}</Link>
//                 </li>
//             ));
//             brandsView = <ul className="ps-list--brands">{items}</ul>;
//         } else {
//         }
//     } else {
//         brandsView = <p>Loading...</p>;
//     }
//     return (
//         <aside className="widget widget_shop widget_shop--brand">
//             <h4 className="widget-title">By Attributes</h4>
//             <figure>
//                 {/* <Radio.Group
//                     defaultValue={slug}
//                     options={brands}
//                     onChange={handleSelectBrand}
//                 /> */}
//                 <Checkbox.Group
//                     defaultValue={slug}
//                     options={brands}
//                     onChange={handleSelectBrand}
//                 />
//             </figure>
//         </aside>
//     );
// };

// export default WidgetShopAttributes;

// import React, { useEffect, useState } from 'react';
// import ProductRepository from '~/repositories/ProductRepository';
// import Link from 'next/link';
// import { Checkbox } from 'antd';
// import { useRouter } from 'next/router';

// const WidgetShopAttributes = () => {
//     const Router = useRouter();
//     const { slug } = Router.query;
//     const [attributes, setAttributes] = useState([]);
//     const [loading, setLoading] = useState(false);

//     async function getAttributes() {
//         setLoading(true);
//         const responseData = await ProductRepository.getAttributes();
//         if (responseData) {
//             console.log('responseData::>>', responseData.ParentAttribute);
//             console.log('responseData::>>', responseData.ChildAttribute);
//             const parentAttributes = responseData.ParentAttribute;
//             const childAttributes = responseData.ChildAttribute;
//             const attributeMap = {};

//             // Map child attributes to their parent attributes
//             childAttributes.forEach((childAttribute) => {
//                 const ID = childAttribute.AttributeID;
//                 if (!attributeMap[ID]) {
//                     const parentAttribute = parentAttributes.find(
//                         (attribute) => attribute.ID === ID
//                     );
//                     attributeMap[ID] = {
//                         id: ID,
//                         label: parentAttribute.Name,
//                         children: [],
//                     };
//                     console.log(' parentAttribute.Name', parentAttribute.Name);
//                 }
//                 attributeMap[ID].children.push({
//                     id: childAttribute.ID,
//                     value: childAttribute.ID,
//                     label: childAttribute.Name,
//                 });
//             });

//             // Convert the map to an array of options
//             const attributeOptions = Object.values(attributeMap).map(
//                 (attribute) => ({
//                     id: attribute.id,
//                     label: attribute.label,
//                     children: attribute.children,
//                 })
//             );

//             setAttributes(attributeOptions);

//             setTimeout(
//                 function () {
//                     setLoading(false);
//                 }.bind(this),
//                 250
//             );
//         }
//     }

//     function handleSelectAttribute(values) {
//         console.log('selected attribute IDs:', values);
//         // use selected attribute IDs to filter products
//     }

//     useEffect(() => {
//         getAttributes();
//     }, []);

//     // Views
//     let attributesView;
//     if (!loading) {
//         if (attributes && attributes.length > 0) {
//             attributesView = (
//                 <ul className="ps-list--attributes">
//                     {attributes.map((attribute) => (
//                         <li key={attribute.id}>
//                             <Checkbox.Group
//                                 options={attribute.children}
//                                 onChange={handleSelectAttribute}>
//                                 <span>{attribute.label}</span>
//                             </Checkbox.Group>
//                         </li>
//                     ))}
//                 </ul>
//             );
//         } else {
//             attributesView = <p>No attributes found.</p>;
//         }
//     } else {
//         attributesView = <p>Loading...</p>;
//     }

//     return (
//         <aside className="widget widget_shop widget_shop--attributes">
//             <h4 className="widget-title">By Attributes</h4>
//             <div className="widget-content">{attributesView}</div>
//         </aside>
//     );
// };

// export default WidgetShopAttributes;

import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
// import ProductByAttributeScreen from '~/pages/attributes/[slug]';
// import Link from 'next/link';
// import { Checkbox } from 'antd';
import { useRouter } from 'next/router';

const WidgetShopAttributes = ({ callBackMethod = () => { } }) => {
    // console.log('callBackMethod =>', callBackMethod);
    const Router = useRouter();
    const { slug } = Router.query;
    const [attributes, setAttributes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAttributeIds, setSelectedAttributeIds] = useState([]);
    // const [attributeIds, setAttributeIds] = useState([]);
    // const [selected, setSelected] = useState([]);

    async function getAttributes() {
        setLoading(true);
        const responseData = await ProductRepository.getAttributes();
        if (responseData) {
            // console.log('responseData::>>', responseData.ParentAttribute);
            // console.log('responseData::>>', responseData.ChildAttribute);
            const parentAttributes = responseData.ParentAttribute;
            const childAttributes = responseData.ChildAttribute;
            const attributeMap = {};

            // Map child attributes to their parent attributes
            childAttributes.forEach((childAttribute) => {
                const ID = childAttribute.AttributeID;
                if (!attributeMap[ID]) {
                    const parentAttribute = parentAttributes.find(
                        (attribute) => attribute.ID === ID
                    );
                    attributeMap[ID] = {
                        id: ID,
                        label: parentAttribute.Name,
                        children: [],
                    };
                }
                attributeMap[ID].children.push({
                    id: childAttribute.ID,
                    value: childAttribute.ID,
                    label: childAttribute.Name,
                });
            });

            // Convert the map to an array of options
            const attributeOptions = Object.values(attributeMap).map(
                (attribute) => ({
                    id: attribute.id,
                    label: attribute.label,
                    children: attribute.children,
                })
            );

            setAttributes(attributeOptions);

            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    // callback(1);
    const handleChange = (event) => {
        if (event.target.checked) {
            // console.log('✅ Checkbox is checked');
            setSelectedAttributeIds([
                ...selectedAttributeIds,
                event.target.value,
            ]);
        } else {
            // console.log('⛔️ Checkbox is NOT checked');

            let filteredArray = selectedAttributeIds.filter(
                (item) => item !== event.target.value
            );
            setSelectedAttributeIds(filteredArray);
        }
        myString = selectedAttributeIds.join(', ');
    };

    console.log('selected attribute IDs:', selectedAttributeIds);
    const myString = selectedAttributeIds.join(', ');
    const cleanedShopAttributes = myString?.replace(/\s/g, '');
    callBackMethod(cleanedShopAttributes);

    useEffect(() => {
        getAttributes();
    }, []);

    // Views
    let attributesView;
    if (!loading) {
        if (attributes && attributes.length > 0) {
            attributesView = (
                <ul className="ps-list--attributes">
                    {attributes.map((attribute) => (
                        <li key={attribute.id} style={{fontSize:"18px"}}>
                            <h4>{attribute.label}</h4>
                            {attribute.children.map((item) => (
                                <>
                                    <label>
                                        <input type="checkbox" value={item.value} onChange={handleChange}  style={{width:"16px", height:"16px"}} />

                                        <span > {item.label}</span>
                                    </label>
                                    <br></br>
                                </>
                            ))}

                            

                            {/* <Checkbox.Group
                                options={attribute.children}
                                onChange={handleSelectAttribute}
                                // onChange={(e) =>
                                //     setSelected([...selected, ...e.filter(d => !ids.has(d.ID))])
                                // }
                            >
                                <span>{attribute.label}</span>
                            </Checkbox.Group> */}
                        </li>
                    ))}
                </ul>
            );
        } else {
            attributesView = <p>No attributes found.</p>;
        }
    } else {
        attributesView = <p>Loading...</p>;
    }

    return (
        <>
            <>
                <aside className="widget widget_shop widget_shop--attributes">
                    <h4 className="widget-title">By Attributes</h4>
                    <div className="widget-content">{attributesView}</div>
                </aside>
            </>
            {/* <ProductByAttributeScreen value={attributeIds} /> */}
        </>
    );
    // <ProductByAttributeScreen value={myString} />;
};

export default WidgetShopAttributes;
