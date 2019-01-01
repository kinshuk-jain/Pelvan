import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import get from 'lodash/get';
import backgroundImg from '../../images/gym1.jpg';
import { Header } from '../../components/Header';
import { ReviewCard } from '../../components/ReviewCard';
import data from './data/reviews.data.json';

import s from './Reviews.css';

class Reviews extends React.Component {
  render() {
    return (
      <div>
        <Header background={backgroundImg} data={data} />
        <div className={s.container}>
          {get(data, 'reviews', []).map((review, i) => (
            <ReviewCard key={i} className={s.reviewCard} {...review} />
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Reviews);
