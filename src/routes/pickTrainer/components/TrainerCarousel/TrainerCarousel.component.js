import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import isEmpty from 'lodash/isEmpty';
import { TitleCarousel } from '../../../../components/TitleCarousel';
import { TrainerCard } from '../index';

import s from './TrainerCarousel.component.css';

const TrainerCarousel = props => {
  const { data: { category = '', list = [] } } = props;
  return category && !isEmpty(list) ? (
    <TitleCarousel
      title={category}
      link={`/our-trainers?category=${category}`}
      className={s.trainerCarousel}
      slidesToShow={4}
    >
      {list.map((trainer, i) => <TrainerCard key={i} data={trainer} />)}
    </TitleCarousel>
  ) : null;
};

TrainerCarousel.propTypes = {
  data: PropTypes.object,
};

TrainerCarousel.defaultProps = {
  data: {},
};

export default withStyles(s)(TrainerCarousel);
