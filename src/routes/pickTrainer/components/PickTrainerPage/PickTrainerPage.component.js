/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import backgroundImg from '../../../../images/gym1.jpg';
import { Footer } from '../../../../components/Footer';
import { Header } from '../../../../components/Header';
import { SearchBar } from '../../../../components/SearchBar';
import { TrainerCarousel, TrainerFilter, TrainerCard } from '../index';

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

  renderSortBy = () => (
    <select
      className={s.sortBy}
      onChange={e => this.props.sortTrainers(e.target.value)}
      defaultValue="sortBy"
    >
      <option value="sortBy" disabled>
        Sort By
      </option>
      <option value="popular">Popular</option>
      <option value="rating">Rating</option>
      <option value="reviews">Reviews</option>
    </select>
  );

  renderGridView(data) {
    const { filter } = this.props;
    const results = get(data, 'results', []);
    const category = get(results[0], 'category', '');
    return (
      <div className={s.grid}>
        <div className={s.gridHeader}>
          {category}
          <span>{!isEmpty(filter) ? this.renderSortBy() : null}</span>
        </div>
        {results.map(trainerList => {
          if (!isEmpty(trainerList) && trainerList.category === category) {
            return get(trainerList, 'list', []).map((trainer, i) => (
              <div className={s.gridItem} key={i}>
                <TrainerCard data={trainer} showReviewOnHover />
              </div>
            ));
          }
          return null;
        })}
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
    return get(data, 'results', []).map((category, i) => (
      <TrainerCarousel data={category} showReviewOnHover={false} key={i} />
    ));
  }

  render() {
    const { data, refToTrainerContainer, filter, onFilterUpdate } = this.props;
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
            <TrainerFilter
              onFilterUpdate={onFilterUpdate}
              preselect={filter}
              data={get(data, 'filters', [])}
            />
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
  onFilterUpdate: PropTypes.func.isRequired,
  sortTrainers: PropTypes.func.isRequired,
};

PickTrainerPage.defaultProps = {
  refToTrainerContainer: () => {},
};

export default withStyles(s)(PickTrainerPage);
