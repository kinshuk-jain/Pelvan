import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { HeaderComponent, BreadCrumbComponent } from '../../components';

class Header extends Component {
  static defaultProps = {
    showChooseTrainer: true,
    render: () => {},
  };

  render() {
    const {
      showChooseTrainer,
      data,
      background,
      defaultTab,
      render,
    } = this.props;
    return [
      <HeaderComponent
        background={background}
        key={1}
        selectedTab={defaultTab}
      />,
      <BreadCrumbComponent
        data={data}
        showChooseTrainer={showChooseTrainer}
        render={render}
        key={2}
      />,
    ];
  }
}

Header.propTypes = {
  background: Proptypes.string.isRequired,
  data: Proptypes.object.isRequired,
  defaultTab: Proptypes.number.isRequired,
  showChooseTrainer: Proptypes.bool,
  render: Proptypes.func,
};

export default Header;
