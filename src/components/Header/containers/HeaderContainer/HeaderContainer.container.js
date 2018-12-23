import React, { Component } from 'react';
// import Proptypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HeaderContainer.container.css';

import { Link } from '../../../Link';
import { SearchBar } from '../../../SearchBar';
import { MenuBar } from '../../../MenuBar';

import { ActionContainer } from '../../../Header';

class Header extends Component {
  render() {
    return (
      <div className={s.header}>
        <MenuBar />
        <Link className={s.logoInfo} target="_self" to="/">
          Pelvan
        </Link>
        <SearchBar />
        <ActionContainer />
      </div>
    );
  }
}

export default withStyles(s)(Header);
