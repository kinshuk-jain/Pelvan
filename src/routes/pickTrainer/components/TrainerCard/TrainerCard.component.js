import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import trainerImg from '../../../../images/trainer_1.jpg';
import tinyTrainerImg from '../../../../images/tiny_trainer_1.jpg';
import { ProgressiveImage } from '../../../../components/ProgressiveImage';

import s from './TrainerCard.component.css';

const TrainerCard = ({ data }) => (
  <div>
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
  </div>
);

TrainerCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withStyles(s)(TrainerCard);
