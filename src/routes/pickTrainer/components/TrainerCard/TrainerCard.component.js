/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import isEmpty from 'lodash/isEmpty';

import trainerImg from '../../../../images/trainer_1.jpg';
import tinyTrainerImg from '../../../../images/tiny_trainer_1.jpg';
import { ProgressiveImage } from '../../../../components/ProgressiveImage';

import s from './TrainerCard.component.css';

// TODO: Replace trainerImg with data.image

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
    <div>
      {data.rating} ({data.ratedBy})
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
          <div>{JSON.stringify(data.topReviews)}</div>
        </div>
      )}
  </div>
);

TrainerCard.propTypes = {
  data: PropTypes.object.isRequired,
  showReviewOnHover: PropTypes.bool.isRequired,
};

export default withStyles(s)(TrainerCard);
