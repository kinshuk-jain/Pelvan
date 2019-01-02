import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { HeaderComponent, BreadCrumbComponent } from '../../components';
import { changeTab } from '../../../../actions/changeTab';

class Header extends Component {
  static defaultProps = {
    render: () => {},
  };

  handleChange = (e, i) => {
    this.props.changeTab(i);
  };

  render() {
    const {
      render,
      data,
      background,
      changeHeaderTab,
      defaultTab,
    } = this.props;
    return [
      <HeaderComponent
        background={background}
        key={1}
        selectedTab={changeHeaderTab || defaultTab}
        handleChange={this.handleChange}
      />,
      <BreadCrumbComponent data={data} render={render} key={2} />,
    ];
  }
}

Header.propTypes = {
  background: Proptypes.string.isRequired,
  data: Proptypes.object.isRequired,
  defaultTab: Proptypes.number.isRequired,
  changeTab: Proptypes.func.isRequired,
  changeHeaderTab: Proptypes.number.isRequired,
  render: Proptypes.func,
};

const mapStateToProps = ({ changeHeaderTab }) => ({
  changeHeaderTab,
});

const mapDispatchToProps = dispatch => ({
  changeTab: payload => dispatch(changeTab(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
