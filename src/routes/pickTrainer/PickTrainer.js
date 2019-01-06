import React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
import { get } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import Card from '@material-ui/core/Card';
import backgroundImg from '../../images/gym1.jpg';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { SearchBar } from '../../components/SearchBar';
import data from './data/pickTrainer.data.json';

import s from './PickTrainer.css';

const Search = () => (
  <div className={s.searchContainer}>
    <SearchBar />
  </div>
);

// TODO: When user navigates to this page, filter might be already applied
// TODO: Implement infinite scrolling
class PickTrainer extends React.Component {
  state = {
    // when applied, show sort by, enable infinite scrolling and show only filtered results
    filter: undefined,
  };

  render() {
    const { filter } = this.state;
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
          <div>
            <span>Filter</span>
            {filter && <span>Sorty By</span>}
          </div>
          {get(data, 'categories', []).map((category, i) => (
            <div key={i}>
              <h3>{category.category}</h3>
              {JSON.stringify(category.list)}
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(PickTrainer);
