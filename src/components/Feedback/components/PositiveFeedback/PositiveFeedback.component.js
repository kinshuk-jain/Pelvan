import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PositiveFeedback.component.css';

import { Modal } from '../../../Modal';

const PositiveFeedback = props => {
  const { modalCloseFn } = props;
  return (
    <Modal overlay closeFn={modalCloseFn} showCross width={40} height={40}>
      <div className={s.positiveFeedback}>
        <i className="icon-ok_sign" /> Thank you for your feedback! It&apos;s
        very valuable to us
      </div>
    </Modal>
  );
};

PositiveFeedback.propTypes = {
  modalCloseFn: PropTypes.func.isRequired,
};

export default withStyles(s)(PositiveFeedback);
