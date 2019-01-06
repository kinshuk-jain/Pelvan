/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import Card from '@material-ui/core/Card';
// import classnames from 'classnames';

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
  state = {
    stickyTop: 0,
  };

  renderGridView(data) {
    const { filter } = this.props;
    return (
      <div>
        Header
        {filter && 'Sort By'}
        {JSON.stringify(data)}
      </div>
    );
  }

  componentDidMount() {
    if (this.filterContainer) {
      this.setState({
        stickyTop: this.filterContainer.scrollHeight - window.innerHeight,
      });
    }
  }

  renderCarouselView(data) {
    return get(data, 'categories', []).map((category, i) => (
      <TrainerCarousel data={category} key={i} />
    ));
  }

  render() {
    const { data, refToTrainerContainer, filter } = this.props;
    const { stickyTop } = this.state;
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
          <div
            style={{
              top: `-${stickyTop}px`,
            }}
            className={s.filterContainer}
            ref={el => (this.filterContainer = el)}
          >
            <TrainerFilter preselect={filter} data={get(data, 'filters', [])} />
          </div>
          <div className={s.trainerCarousel} ref={refToTrainerContainer}>
            {isEmpty(filter)
              ? this.renderCarouselView(data)
              : this.renderGridView(data)}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

PickTrainerPage.propTypes = {
  data: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  refToTrainerContainer: PropTypes.func,
};

PickTrainerPage.defaultProps = {
  refToTrainerContainer: () => {},
};

export default withStyles(s)(PickTrainerPage);
