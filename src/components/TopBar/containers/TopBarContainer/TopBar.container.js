import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeTopBar } from '../../../../actions/topBarActions';
import { TopBarComponent } from '../../components';
import data from '../../data/topBar.data.json';

class TopBarContainer extends React.Component {
  static propTypes = {
    hideTopBar: PropTypes.bool.isRequired,
    closeTopBar: PropTypes.func.isRequired,
  };

  render() {
    const { hideTopBar } = this.props;
    return (
      <TopBarComponent
        hideTopBar={hideTopBar}
        closeTopBar={this.props.closeTopBar}
        {...data}
      />
    );
  }
}

export const TopBar = connect(
  ({ hideTopBar = true }) => ({
    hideTopBar,
  }),
  dispatch => ({
    closeTopBar: payload => dispatch(closeTopBar(payload)),
  }),
)(TopBarContainer);
