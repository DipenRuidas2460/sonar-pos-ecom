// import React from 'react';

// const Rating = ({ product }) => (
//     <span className="ps-rating">
//         <i className="fa fa-star"></i>
//         <i className="fa fa-star"></i>
//         <i className="fa fa-star"></i>
//         <i className="fa fa-star-o"></i>
//         <i className="fa fa-star-o"></i>
//     </span>
// );

// export default Rating;

import React from 'react';

const Rating = ({ product }) => {
    // const rating = Math.round(product?.ItemAverageRating[0].AverageRating * 2) / 2; // Round the rating to the nearest half-star
    const rating = Math.round(product?.AverageRating * 2) / 2; // Round the rating to the nearest half-star
    // const rating = 4.5;
    const filledStars = 'fa fa-star';
    const halfStar = 'fa fa-star-half-o ';
    const emptyStars = 'fa fa-star-o';
    const stars = [];

    // Loop through the rating value and render the appropriate number of filled and empty stars
    for (let i = 0; i < Math.floor(rating); i++) {
        stars.push(<i className={filledStars} key={i}></i>);
    }

    if (rating % 1 >= 0.5) {
        stars.push(<i className={halfStar} key={stars.length}></i>);
    }

    for (let i = Math.ceil(rating); i < 5; i++) {
        stars.push(<i className={emptyStars} key={stars.length}></i>);
    }

    return <span className="ps-rating">{stars}</span>;
};

export default Rating;
