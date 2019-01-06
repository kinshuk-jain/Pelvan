import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
import get from 'lodash/get';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import Card from '@material-ui/core/Card';
import backgroundImg from '../../../../images/gym1.jpg';
import { Footer } from '../../../../components/Footer';
import { Header } from '../../../../components/Header';
import { SearchBar } from '../../../../components/SearchBar';
import { TrainerCarousel, TrainerFilter } from '../index';

import s from './PickTrainerPage.component.css';

const Search = () => (
  <div className={s.searchContainer}>
    <SearchBar />
  </div>
);

class PickTrainerPage extends React.Component {
  renderGridView() {
    const { filter } = this.props;
    return (
      <div>
        Header
        {filter && 'Sort By'}
      </div>
    );
  }

  renderCarouselView(data) {
    return get(data, 'categories', []).map((category, i) => (
      <TrainerCarousel data={category} key={i} />
    ));
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Header
          background={backgroundImg}
          data={data}
          defaultTab={2}
          showChooseTrainer={false}
          render={Search}
        />
        <div className={s.container}>
          <div className={s.filterContainer}>
            <TrainerFilter />
          </div>
          <div className={s.trainerCarousel}>
            {this.renderCarouselView(data)}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

PickTrainerPage.propTypes = {
  data: PropTypes.object.isRequired,
  filter: PropTypes.bool.isRequired,
};

export default withStyles(s)(PickTrainerPage);
