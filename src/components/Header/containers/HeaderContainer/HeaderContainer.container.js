import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { HeaderComponent, BreadCrumbComponent } from '../../components';

class Header extends Component {
  static defaultProps = {
    showChooseTrainer: true,
  };

  render() {
    const { showChooseTrainer, data, background, defaultTab } = this.props;
    return [
      <HeaderComponent
        background={background}
        key={1}
        selectedTab={defaultTab}
      />,
      <BreadCrumbComponent
        data={data}
        showChooseTrainer={showChooseTrainer}
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
};

export default Header;
