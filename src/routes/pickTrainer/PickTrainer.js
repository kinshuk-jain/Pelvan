import React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import Card from '@material-ui/core/Card';
import backgroundImg from '../../images/gym1.jpg';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import data from './data/pickTrainer.data.json';

import s from './PickTrainer.css';

class PickTrainer extends React.Component {
  render() {
    return (
      <div>
        <Header
          background={backgroundImg}
          data={data}
          defaultTab={2}
          showChooseTrainer={false}
        />
        <div className={s.container} />
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(PickTrainer);
