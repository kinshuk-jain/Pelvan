import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { HeaderComponent } from '../../components';

class Header extends Component {
  render() {
    return <HeaderComponent background={this.props.background} />;
  }
}

Header.propTypes = {
  background: Proptypes.string.isRequired,
};

export default Header;
