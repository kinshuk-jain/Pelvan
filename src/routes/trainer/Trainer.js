import React from 'react';
// import PropTypes from 'prop-types';
import { TrainerPage } from './components';
import data from './data/trainer.data.json';

class Trainer extends React.Component {
  render() {
    return <TrainerPage data={data} />;
  }
}

export default Trainer;
