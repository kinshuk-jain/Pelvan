import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './ourTrainers.component.css';

class OurTrainers extends PureComponent {
  render() {
    return (
      <div className={s.container}>
        <div>
          <h1>Our trainers</h1>
          <button>View all</button>
        </div>
        <div>Carousel</div>
      </div>
    );
  }
}

export default withStyles(s)(OurTrainers);
