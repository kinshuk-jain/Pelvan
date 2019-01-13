import React, { Component } from 'react';
// import Proptypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import s from './Header.css';

import { Link } from '../../../Link';
import { SearchBar } from '../../../SearchBar';

class Header extends Component {
  render() {
    return (
      <div className={s.header}>
        <Link className={s.logoInfo} target="_self" to="/">
          Pelvan
        </Link>
        <div className={s.searchBar}>
          <SearchBar />
        </div>
        <Tabs
          classes={{ root: `${s.tabContainer}` }}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
        >
          <Tab
            label="Home"
            disableRipple
            disableTouchRipple
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            disableRipple
            disableTouchRipple
            label="About Us"
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            label="Our Trainers"
            disableRipple
            disableTouchRipple
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            label="Reviews"
            disableRipple
            disableTouchRipple
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            disableRipple
            disableTouchRipple
            label="Login"
            href="/login"
            classes={{ label: `${s.authButton}`, root: `${s.labelRoot}` }}
          />
        </Tabs>
      </div>
    );
  }
}

export default withStyles(s)(Header);
