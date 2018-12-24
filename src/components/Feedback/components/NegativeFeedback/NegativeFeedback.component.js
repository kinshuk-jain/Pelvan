import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NegativeFeedback.component.css';
import { ALLOWED_COMMENT_LENGTH } from '../../Feedback.constants';
import { Modal } from '../../../Modal';

const FormTitle = () => (
  <div className={s.modalTitle}>
    Your feedback is very valuable to us. Please let us know how can can we fix
    this
  </div>
);

const FormSelectBox = props => {
  const { handleSelectChange, state, data } = props;
  return (
    <select value={state.selectValue} onChange={handleSelectChange}>
      <option value="select" disabled>
        Please select an issue
      </option>
      {data.issue.map((issue, index) => (
        <option key={index} value={issue}>
          {issue}
        </option>
      ))}
    </select>
  );
};

FormSelectBox.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const FormTextArea = ({ handleCommentChange, remainingCommentLength }) => (
  <div className={s.textareaContainer}>
    <span className={s.wordCount}>{remainingCommentLength()}</span>
    <textarea
      maxLength={ALLOWED_COMMENT_LENGTH}
      className={s.feedbackRow}
      onChange={handleCommentChange}
      placeholder="Please give us a detailed description"
    />
  </div>
);

FormTextArea.propTypes = {
  handleCommentChange: PropTypes.func.isRequired,
  remainingCommentLength: PropTypes.func.isRequired,
};

class FeedbackForm extends Component {
  static Header = FormTitle;
  static Select = FormSelectBox;
  static TextArea = FormTextArea;
  render() {
    const { onSubmit, invalidInput, invalidText } = this.props;
    return (
      <form>
        <FeedbackForm.Header />
        <div className={s.label}>Issue: </div>
        <FeedbackForm.Select {...this.props} />
        {invalidInput && <div className={s.error}>Please select an issue</div>}
        <div className={s.label}>Description: </div>
        <FeedbackForm.TextArea {...this.props} />
        {invalidText && (
          <div className={s.error}>
            Please enter the reason in minimum 30 words
          </div>
        )}
        <button className={s.submit} onClick={onSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

FeedbackForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  invalidInput: PropTypes.bool.isRequired,
  invalidText: PropTypes.bool.isRequired,
};

const NegativeFeedback = props => {
  const { successSubmit, modalCloseFn } = props;
  return (
    <Modal overlay closeFn={modalCloseFn} showCross width={40} height={70}>
      <div className={s.negativeFeedback}>
        {!successSubmit ? (
          <FeedbackForm {...props} />
        ) : (
          <div className={s.successSubmit}>
            <i className="icon-ok_sign" /> Successfully submitted. We will try
            to address this issue as soon as possible. Thank you!
          </div>
        )}
      </div>
    </Modal>
  );
};

NegativeFeedback.propTypes = {
  successSubmit: PropTypes.bool.isRequired,
  modalCloseFn: PropTypes.func.isRequired,
};

export default withStyles(s)(NegativeFeedback);
