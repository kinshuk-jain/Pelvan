/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import trainerImg from '../../../../images/trainer_1.jpg';
import tinyTrainerImg from '../../../../images/tiny_trainer_1.jpg';
import { ProgressiveImage } from '../../../../components/ProgressiveImage';

import s from './TrainerCard.component.css';

const TrainerCard = ({ data = {} }) => (
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
    <div className={s.hoverContainer}>
      <video
        autoPlay
        muted
        loop
        className={s.video}
        poster={
          data.image ||
          'https://s3.amazonaws.com/nikeinc-vendor-assets/about/About-Landing-Movie.jpg'
        }
      >
        <source
          src={
            data.video ||
            'https://s3.amazonaws.com/nikeinc-vendor-assets/about/About-Landing-Movie.mp4'
          }
          type="video/mp4"
        />
        Your browser does not support HTML5 video.
      </video>
      <div>{JSON.stringify(data.topReviews)}</div>
    </div>
  </div>
);

TrainerCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withStyles(s)(TrainerCard);
