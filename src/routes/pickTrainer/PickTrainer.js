import React from 'react';
import data from './data/pickTrainer.data.json';

import { PickTrainerPage } from './components';

// TODO: When user navigates to this page, filter might be already applied
// TODO: Implement infinite scrolling
class PickTrainer extends React.Component {
  state = {
    // when applied, show sort by, enable infinite scrolling and show only filtered results
    filter: undefined,
  };

  render() {
    const { filter } = this.state;
    return <PickTrainerPage data={data} filter={filter} />;
  }
}

export default PickTrainer;
