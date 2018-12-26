import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { HeaderComponent, BreadCrumbComponent } from '../../components';

class Header extends Component {
  static defaultProps = {
    render: () => {},
  };

  render() {
    const { render, data, background } = this.props;
    return [
      <HeaderComponent background={background} key={1} />,
      <BreadCrumbComponent data={data} render={render} key={2} />,
    ];
  }
}

Header.propTypes = {
  background: Proptypes.string.isRequired,
  data: Proptypes.object.isRequired,
  render: Proptypes.func,
};

export default Header;
