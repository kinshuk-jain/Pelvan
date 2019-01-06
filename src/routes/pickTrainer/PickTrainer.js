/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-assign */
import React from 'react';
import debounce from 'lodash/debounce';
import { parse } from 'query-string';
import mockData from './data/pickTrainer.data.json';
import { addRemoveScrollEventListener } from '../../core/utils';
import { PickTrainerPage } from './components';

// TODO: Style Grid View
// TODO: TrainerCard component

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

    this.setState({
      filter: qs || {},
    });

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
