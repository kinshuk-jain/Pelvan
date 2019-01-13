/* eslint-disable default-case */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-assign */
import React from 'react';
import debounce from 'lodash/debounce';
import { parse, stringify } from 'query-string';
import mockData from './data/pickTrainer.data.json';
import { addRemoveScrollEventListener } from '../../core/utils';
import { PickTrainerPage } from './components';

// TODO: Peformance of infinite scroll will deteriorate if there are a lot of elements on the page. If user is scrolling down a lot, remove older
// elements i.e. keep max amount of TrainerCards that can be shown on the page fixed irrespective of how much users scrolls. If more elements
// delete older elements when fetching new ones.

const INFINITE_SCROLL_OFFSET = 200;

class PickTrainer extends React.Component {
  state = {
    // when applied, show sort by and show only filtered results
    filter: {},
    data: mockData,
  };

  scrollListener = debounce(() => {
    this.scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    if (
      this.refToTrainerContainer &&
      this.scrollPosition >
        this.refToTrainerContainer.scrollHeight - INFINITE_SCROLL_OFFSET
    ) {
      // TODO: fetch more data with currently applied filters
      this.setState(state => ({
        data: {
          ...state.data,
          results: state.data.results.concat(mockData.results),
        },
      }));
    }
  }, 200);

  // TODO: apply sort function
  sortTrainers = option => {
    switch (option) {
      case 'popular':
        break;
      case 'rating':
        break;
      case 'reviews':
        break;
    }
  };

  componentDidMount() {
    const qs = parse(location.search);
    const { data } = this.state;
    Object.keys(qs).forEach(key => {
      if (
        !data.filters.some(
          elem => elem.name.toLowerCase() === key.toLowerCase(),
        )
      ) {
        // delete all keys not valid filters
        delete qs[key];
      }
    });
    // TODO: fetch data with applied filters
    this.setState({
      filter: qs || {},
    });

    addRemoveScrollEventListener(this.scrollListener);
  }

  componentWillUnmount() {
    addRemoveScrollEventListener(this.scrollListener, true);
  }

  urlUpdate = filter => {
    history.pushState(filter, 'our-trainers', `?${stringify(filter)}`);
  };

  onFilterUpdate = (name, option, removeFilter = false) => {
    const { filter } = this.state;
    const filterName = filter[name];

    // adding a filter
    if (filterName) {
      // filter already exists
      filter[name] = [option].concat(filterName);
    } else {
      filter[name] = option;
    }

    // removing a filter
    if (filterName && removeFilter) {
      // if filter is an array
      if (Array.isArray(filterName)) {
        filterName.splice(filterName.indexOf(option), 1);
        filter[name] = filterName;
      } else {
        delete filter[name];
      }
    }

    // change query string in url
    this.urlUpdate(filter);

    // TODO: fetch data with new filters
    this.setState({
      filter,
    });
  };

  render() {
    const { filter, data } = this.state;
    return (
      <PickTrainerPage
        data={data}
        filter={filter}
        sortTrainers={this.sortTrainers}
        onFilterUpdate={this.onFilterUpdate}
        refToTrainerContainer={el => (this.refToTrainerContainer = el)}
      />
    );
  }
}

export default PickTrainer;
