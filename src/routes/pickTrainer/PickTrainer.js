/* eslint-disable no-return-assign */
import React from 'react';
import debounce from 'lodash/debounce';

import mockData from './data/pickTrainer.data.json';
import { addRemoveScrollEventListener } from '../../core/utils';
import { PickTrainerPage } from './components';

// TODO: Grid view when filter is selected or present in query string. Carousel view when all filters are removed
// Preselect Filter that is already present in query string
// show loading gif
// trainer card

const INFINITE_SCROLL_OFFSET = 200;

class PickTrainer extends React.Component {
  state = {
    // when applied, show sort by and show only filtered results
    filter: false,
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
      // fetch more data, infinite scroll
      this.setState(state => ({
        data: {
          ...state.data,
          categories: state.data.categories.concat(mockData.categories),
        },
      }));
    }
  }, 200);

  componentDidMount() {
    addRemoveScrollEventListener(this.scrollListener);
  }

  componentWillUnmount() {
    addRemoveScrollEventListener(this.scrollListener, true);
  }

  onFilterToggle() {
    this.setState({
      filter: true,
    });
  }

  render() {
    const { filter, data } = this.state;
    return (
      <PickTrainerPage
        data={data}
        filter={filter}
        refToTrainerContainer={el => (this.refToTrainerContainer = el)}
      />
    );
  }
}

export default PickTrainer;
