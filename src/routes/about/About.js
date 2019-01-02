import React from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import backgroundImg from '../../images/gym1.jpg';

import { Header } from '../../components/Header';
import data from './data/about.data.json';

import s from './About.css';

class About extends React.Component {
  render() {
    return (
      <div>
        <Header defaultTab={1} background={backgroundImg} data={data} />
        <div className={s.container}>
          <p>
            We help you achieve the levels of fiteness you always desired
            through professional trainers that look into your every needs.
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(About);
