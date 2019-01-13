/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import StarRatings from 'react-star-ratings';
import Divider from '@material-ui/core/Divider';

import trainerImg from '../../../../images/trainer_1.jpg';
import tinyTrainerImg from '../../../../images/tiny_trainer_1.jpg';
import { ProgressiveImage } from '../../../../components/ProgressiveImage';

import s from './TrainerCard.component.css';

// TODO: Replace trainerImg with data.image

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

// eslint-disable-next-line react/prop-types
const UserReview = ({ data }) => (
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

const TrainerCard = ({ data = {}, showReviewOnHover = false }) => (
  <div className={s.container}>
    <ProgressiveImage
      className={s.image}
      tinyImage={tinyTrainerImg}
      src={trainerImg}
      alt={data.name}
      title={data.name}
    />
    <span className={s.name}>{data.name}</span>
    <div className={s.starRating}>
      <RenderStar rating={data.rating} />
      <span className={s.ratedBy}>({data.ratedBy})</span>
    </div>
    {showReviewOnHover &&
      (data.video || !isEmpty(data.topReviews)) && (
        <div className={s.hoverContainer}>
          <video autoPlay muted loop className={s.video} poster={data.image}>
            <source src={data.video} type="video/mp4" />
            <img
              src={data.image}
              alt="Video not supported"
              title="Your browser does not support HTML5 video"
            />
          </video>
          {get(data, 'topReviews', []).map((review, i) => (
            <UserReview data={review} key={i} />
          ))}
        </div>
      )}
  </div>
);

TrainerCard.propTypes = {
  data: PropTypes.object.isRequired,
  showReviewOnHover: PropTypes.bool.isRequired,
};

export default withStyles(s)(TrainerCard);
