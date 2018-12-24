/* eslint-disable no-unused-expressions */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Page.component.css';

import { scrollToTop } from '../../../../core/utils';
import { TopBar } from '../../../TopBar';

const Page = props => {
  const { hideTopBar, children, showScrollToTop } = props;
  return (
    <div className={s.pageContainer}>
      <TopBar />
      <div className={cx({ [s.addTopBarHeight]: !hideTopBar })}>{children}</div>
      {showScrollToTop && (
        <div
          className={s.scrollToTop}
          onClick={() => {
            scrollToTop(1500);
          }}
        >
          <i className="icon-chevron-up" />
        </div>
      )}
    </div>
  );
};

Page.defaultProps = {
  showScrollToTop: false,
};

Page.propTypes = {
  hideTopBar: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  showScrollToTop: PropTypes.bool,
};

export default withStyles(normalizeCss, s)(Page);
