import React from 'react';
import { FeedbackBar } from '../../components';
import PositiveFeedbackContainer from '../PositiveFeedbackContainer/PositiveFeedbackContainer.container';
import NegativeFeedbackContainer from '../NegativeFeedbackContainer/NegativeFeedbackContainer.container';

// TODO: Submit feedback
export class FeedbackBarContainer extends React.Component {
  state = {
    showPositiveModal: false,
    showNegativeModal: false,
  };

  onYesClick = () => {
    this.setState({ showPositiveModal: true });
  };

  onNoClick = () => {
    this.setState({ showNegativeModal: true });
  };

  modalCloseFn = () => {
    this.setState({
      showNegativeModal: false,
      showPositiveModal: false,
    });
  };

  render() {
    const { showNegativeModal, showPositiveModal } = this.state;
    return (
      <div>
        <FeedbackBar onYesClick={this.onYesClick} onNoClick={this.onNoClick} />
        {showPositiveModal && (
          <PositiveFeedbackContainer modalCloseFn={this.modalCloseFn} />
        )}
        {showNegativeModal && (
          <NegativeFeedbackContainer modalCloseFn={this.modalCloseFn} />
        )}
      </div>
    );
  }
}
