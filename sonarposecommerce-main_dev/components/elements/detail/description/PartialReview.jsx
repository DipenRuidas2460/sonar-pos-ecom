import React, { useEffect, useState } from 'react';
import Repository, {
    baseUrl,
    baseAuthUrl,
    ProductGetUrl,
    ReviewGetUrl,
    serializeQuery,
} from '../../../../repositories/Repository';
import { Rate } from 'antd';
import Rating from '~/components/elements/Rating';
import { Form, Input, notification } from 'antd';
import axios from 'axios';
// import React from 'react';

const PartialReview = ({ product }) => {
    // console.log("product PartialReview ==> ",product);
    const [formValues, setFormValues] = useState({
        Rating: 1,
        Review: '',
        FullName: '',
        Email: '',
    });
    const resetForm = () => {
        return {
            Rating: 1,
            Review: '',
            FullName: '',
            Email: '',
        };
    };
    const [loading, setLoading] = useState(false);
    const handleFormChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormValues({ ...formValues, [name]: newValue });
    };

    const handleChange = (value) => {
        setFormValues({ ...formValues, Rating: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            id: 0,
            itemid: 1,
            cutomerid: 1,
            ratings: formValues.Rating,
            review: formValues.Review,
            name: formValues.FullName,
            email: formValues.Email,
            submit: 'abcdefg',
            loginuserid: 1,
        };
        // setLoading(true);
        axios
            .post(`${ReviewGetUrl}/reviews/insert`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    // Authorization: token,
                },
            })
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    notification['success']({
                        message: 'Data successfully submitted!',
                        description: 'Data successfully submitted ',
                    });
                    window.location.reload();
                } else if (res.data.ResponseCode === 'ERROR') {
                    notification['error']({
                        message: 'ERROR!!!',
                        description: 'Something went wrong!!',
                    });
                } else {
                    notification['error']({
                        message: 'ERROR!!!',
                        description: 'Something went wrong!!',
                    });
                    // toastError('Something went wrong, Try Again!!!');
                    // toastError(ERROR_MESSAGE);
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'ERROR!!!',
                    description: error,
                });
                // setLoading(false);
            });
    };
    return (
        <>
            <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
                    <div className="ps-block--average-rating">
                        <div className="ps-block__header">
                            {/* <h3>4.00</h3> */}
                            <h3>
                                {parseFloat(
                                    product.ItemAverageRating[0]?.AverageRating
                                ).toFixed(2)}
                            </h3>
                            <Rating product={product.ItemAverageRating[0]} />

                            <span>
                                {product?.ItemRatingsCount[0].RatingsCount}{' '}
                                Reviews
                            </span>
                        </div>
                        <div className="ps-block__star">
                            <span>5 Star</span>
                            <div
                                className="ps-progress"
                                data-value={
                                    product.FiveStarPercentage[0]
                                        ?.FiveStarPercentage
                                }>
                                <span></span>
                            </div>
                            {/* <span>100%</span> */}
                            <span>
                                {
                                    product.FiveStarPercentage[0]
                                        ?.FiveStarPercentage
                                }
                                %
                            </span>
                        </div>
                        <div className="ps-block__star">
                            <span>4 Star</span>
                            <div
                                className="ps-progress"
                                data-value={
                                    product.FourStarPercentage[0]
                                        ?.FourStarPercentage
                                }>
                                <span></span>
                            </div>
                            <span>
                                {
                                    product.FourStarPercentage[0]
                                        ?.FourStarPercentage
                                }
                                %
                            </span>
                        </div>
                        <div className="ps-block__star">
                            <span>3 Star</span>
                            <div
                                className="ps-progress"
                                data-value={
                                    product.ThreeStarPercentage[0]
                                        ?.ThreeStarPercentage
                                }>
                                <span></span>
                            </div>
                            <span>
                                {
                                    product.ThreeStarPercentage[0]
                                        ?.ThreeStarPercentage
                                }
                                %
                            </span>
                        </div>
                        <div className="ps-block__star">
                            <span>2 Star</span>
                            <div
                                className="ps-progress"
                                data-value={
                                    product.TwoStarPercentage[0]
                                        ?.TwoStarPercentage
                                }>
                                <span></span>
                            </div>
                            <span>
                                {
                                    product.TwoStarPercentage[0]
                                        ?.TwoStarPercentage
                                }
                                %
                            </span>
                        </div>
                        <div className="ps-block__star">
                            <span>1 Star</span>
                            <div
                                className="ps-progress"
                                data-value={
                                    product.OneStarPercentage[0]
                                        ?.OneStarPercentage
                                }>
                                <span></span>
                            </div>
                            <span>
                                {
                                    product.OneStarPercentage[0]
                                        ?.OneStarPercentage
                                }{' '}
                                %
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
                    <form
                        className="ps-form--review"
                        action="/"
                        method="get"
                        onSubmit={handleSubmit}>
                        <h4>Submit Your Review</h4>
                        <p>
                            Your email address will not be published. Required
                            fields are marked
                            <sup>*</sup>
                        </p>
                        <div className="form-group form-group__rating">
                            <label>Your rating of this product</label>
                            <Rate
                                name="Rating"
                                defaultValue={1}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="Review"
                                className="form-control"
                                rows="6"
                                placeholder="Write your review here"
                                onChange={handleFormChange}></textarea>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                                <div className="form-group">
                                    <input
                                        name="FullName"
                                        className="form-control"
                                        type="text"
                                        placeholder="Your Name"
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                                <div className="form-group">
                                    <input
                                        name="Email"
                                        className="form-control"
                                        type="email"
                                        placeholder="Your Email"
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group submit">
                            <button className="ps-btn" type="submit">
                                Submit Review
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PartialReview;
