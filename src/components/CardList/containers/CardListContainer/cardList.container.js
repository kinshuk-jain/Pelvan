import React, { PureComponent } from 'react';
import { CardListComponent } from '../../components';
import data from '../../data/homePageCardList.data.json';

class CardList extends PureComponent {
  render() {
    return Object.keys(data).map((key, index) => (
      <CardListComponent key={index} data={data[key]} />
    ));
  }
}

export default CardList;
