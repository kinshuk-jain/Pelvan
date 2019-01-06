/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-return-assign */
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
  state = {
    stickyTop: 0,
  };

  renderGridView() {
    const { filter } = this.props;
    return (
      <div>
        Header
        {filter && 'Sort By'}
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
    const { data, refToTrainerContainer } = this.props;
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
            <TrainerFilter data={get(data, 'filters', [])} />
          </div>
          <div className={s.trainerCarousel} ref={refToTrainerContainer}>
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
  refToTrainerContainer: PropTypes.func,
};

PickTrainerPage.defaultProps = {
  refToTrainerContainer: () => {},
};

export default withStyles(s)(PickTrainerPage);
