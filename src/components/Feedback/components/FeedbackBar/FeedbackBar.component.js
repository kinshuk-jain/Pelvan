import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FeedbackBar.component.css';

const FeedbackBar = props => {
  const { onYesClick, onNoClick } = props;
  return (
    <div className={s.root}>
      <div className={s.container}>
        Were we able to help you?
        <button
          className={s.feedbackBtn}
          onClick={onYesClick}
          // TODO: Submit success
        >
          Yes
        </button>
        <button className={s.feedbackBtn} onClick={onNoClick}>
          No
        </button>
      </div>
    </div>
  );
};

FeedbackBar.propTypes = {
  onYesClick: PropTypes.func.isRequired,
  onNoClick: PropTypes.func.isRequired,
};

export default withStyles(s)(FeedbackBar);
