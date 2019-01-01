/* eslint-disable no-unused-expressions */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';

import {
  addRemoveScrollEventListener,
  imgProgressiveload,
  inView,
} from '../../../../core/utils';
import { Page } from '../../components';
import s from './Layout.container.css';

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
    let progressiveImageCount;
    const progressiveImages = document.getElementsByClassName(
      'progressive replace',
    );

    imgProgressiveload(progressiveImages, progressiveImageCount, s.reveal);

    window.addEventListener(
      'resize',
      () => inView(progressiveImages, progressiveImageCount, s.reveal),
      false,
    );

    addRemoveScrollEventListener(() => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      if (top > 200) {
        !this.state.showScrollToTop && this.setState({ showScrollToTop: true });
        return;
      }
      this.state.showScrollToTop && this.setState({ showScrollToTop: false });
      inView(progressiveImages, progressiveImageCount, s.reveal);
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

export const Layout = withStyles(s)(
  connect(mapStateToProps, null)(LayoutContainer),
);
