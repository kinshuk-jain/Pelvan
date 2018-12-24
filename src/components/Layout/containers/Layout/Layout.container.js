/* eslint-disable no-unused-expressions */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addRemoveScrollEventListener } from '../../../../core/utils';
import { Page } from '../../components';

class LayoutContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    hideTopBar: PropTypes.bool,
  };

  static defaultProps = {
    hideTopBar: true,
  };

  state = {
    showScrollToTop: false,
  };

  componentDidMount() {
    addRemoveScrollEventListener(() => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      if (top > 200) {
        !this.state.showScrollToTop && this.setState({ showScrollToTop: true });
        return;
      }
      this.state.showScrollToTop && this.setState({ showScrollToTop: false });
    });
  }

  render() {
    const { hideTopBar, children } = this.props;
    const { showScrollToTop } = this.state;
    return (
      <Page hideTopBar={hideTopBar} showScrollToTop={showScrollToTop}>
        {children}
      </Page>
    );
  }
}

const mapStateToProps = ({ hideTopBar }) => ({
  hideTopBar,
});

export const Layout = connect(mapStateToProps, null)(LayoutContainer);
