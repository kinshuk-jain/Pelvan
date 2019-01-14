import React, { Component } from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import s from './Header.css';

import { Link } from '../../../Link';
import { SearchBar } from '../../../SearchBar';

class Header extends Component {
  render() {
    const { hideTopBar } = this.props;
    return (
      <div className={classNames(s.header, { [s.withTopBar]: !hideTopBar })}>
        <Link className={s.logoInfo} target="_self" to="/">
          Pelvan
        </Link>
        <div className={s.searchBar}>
          <SearchBar />
        </div>
        <Tabs
          value={0}
          classes={{ root: `${s.tabContainer}` }}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
        >
          <Tab
            label="Home"
            icon={<i className="icon-home3" />}
            disableRipple
            disableTouchRipple
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            icon={<i className="icon-users" />}
            disableRipple
            disableTouchRipple
            label="About Us"
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            icon={<i className="icon-accessibility" />}
            label="Our Trainers"
            disableRipple
            disableTouchRipple
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            icon={<i className="icon-rate_review" />}
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

Header.propTypes = {
  hideTopBar: Proptypes.bool.isRequired,
};

const mapStateToProps = ({ hideTopBar }) => ({
  hideTopBar,
});

export default withStyles(s)(connect(mapStateToProps, null)(Header));
