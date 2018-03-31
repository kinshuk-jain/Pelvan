import React, { Component } from 'react';
// import Proptypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HeaderContainer.component.css';

import { Link } from '../../../Link';
import SearchBar from '../../../SearchBar';
import MenuBar from '../../../MenuBar';

import { ActionContainer } from '../../../Header';

class HeaderContainer extends Component {
  render() {
    return (
      <div className={s.header}>
        <MenuBar />
        <Link className={s.logoInfo} target="_self" to="/">
          CryptoCraps
        </Link>
        <SearchBar />
        <ActionContainer />
      </div>
    );
  }
}

export default withStyles(s)(HeaderContainer);
