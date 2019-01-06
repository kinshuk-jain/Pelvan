import React from 'react';
import PropTypes from 'prop-types';

const TrainerCard = ({ data }) => <div>{JSON.stringify(data)}</div>;

TrainerCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TrainerCard;
