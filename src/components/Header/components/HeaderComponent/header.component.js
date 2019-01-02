import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer from '@material-ui/core/Drawer';
import history from '../../../../history';
import s from './header.component.css';
import tinyImage from '../../../../images/tiny_gym1.jpg';

import { Link } from '../../../Link';
import { ProgressiveImage } from '../../../ProgressiveImage';

const routes = ['/', '/about', '/our-trainers', '/reviews'];

class HeaderComponent extends PureComponent {
  state = {
    showDrawer: false,
  };

  static defaultProps = {
    background: undefined,
  };

  toggleDrawer = showDrawer => () => {
    this.setState({ showDrawer });
  };

  handleChange = (e, i) => {
    history.push(routes[i]);
  };

  render() {
    const { background, selectedTab } = this.props;

    return (
      <Paper className={s.header}>
        <ProgressiveImage
          className={s.headerImg}
          tinyImage={tinyImage}
          src={background}
          alt="Train with us"
          title="Pelvan"
        />
        <div className={s.logoInfo}>
          <Link className={s.logo} target="_self" to="/">
            Pelvan
          </Link>
        </div>
        <Tabs
          classes={{ root: `${s.tabContainer}` }}
          value={selectedTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          centered
        >
          <Tab
            label="Home"
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
  selectedTab: PropTypes.number.isRequired,
};

export default withStyles(s)(HeaderComponent);
