import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer from '@material-ui/core/Drawer';
import s from './header.component.css';

import { Link } from '../../../Link';

class HeaderComponent extends PureComponent {
  state = {
    selected: 0,
    showDrawer: false,
  };

  static defaultProps = {
    background: undefined,
  };

  toggleDrawer = showDrawer => () => {
    this.setState({ showDrawer });
  };

  handleChange = (e, i) => {
    this.setState({ selected: i });
  };

  render() {
    const { background } = this.props;
    return (
      <Paper className={s.header}>
        <img src={background} alt="Train with us" />
        <div className={s.logoInfo}>
          <Link className={s.logo} target="_self" to="/">
            Pelvan
          </Link>
        </div>
        <Tabs
          classes={{ root: `${s.tabContainer}` }}
          value={this.state.selected}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          centered
        >
          <Tab
            label="Home"
            href="/"
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            label="About Us"
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            label="Our Trainers"
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            label="Reviews"
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            label="Compare Trainers"
            onClick={this.toggleDrawer(true)}
            classes={{ label: `${s.label}`, root: `${s.labelRoot}` }}
          />
          <Tab
            label="Login"
            href="/login"
            classes={{ label: `${s.authButton}`, root: `${s.labelRoot}` }}
          />
          <Tab
            label="Sign Up"
            href="/register"
            classes={{ label: `${s.authButton}`, root: `${s.labelRoot}` }}
          />
        </Tabs>
        <Drawer
          anchor="right"
          open={this.state.showDrawer}
          onClose={this.toggleDrawer(false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            Hello
          </div>
        </Drawer>
      </Paper>
    );
  }
}

HeaderComponent.propTypes = {
  background: PropTypes.string,
};

export default withStyles(s)(HeaderComponent);
