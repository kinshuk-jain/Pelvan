/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import StarRatings from 'react-star-ratings';
import Divider from '@material-ui/core/Divider';

import s from './Review.css';

// eslint-disable-next-line react/prop-types
const RenderStar = ({ rating, starSize = '20px' }) => (
  <StarRatings
    numberOfStars={5}
    rating={rating}
    starDimension={starSize}
    starSpacing="1px"
    starRatedColor="rgb(255, 203, 12)"
  />
);

const Review = ({ data = {} }) => (
  <div className={s.userReviewContainer}>
    <div>
      <img className={s.userThumbnail} title={data.name} src={data.thumbnail} />
      <span>{data.name}</span>
    </div>
    <RenderStar rating={data.rating} starSize="15px" />
    <span className={s.reviewTitle} title={data.title}>
      {data.title}
    </span>
    <div className={s.reviewDate}>
      {new Date(data.timestamp).toDateString()}
    </div>
    <Divider variant="middle" />
    <p>{data.comment}</p>
  </div>
);

Review.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withStyles(s)(Review);
