import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import { Modal } from '../../components/Modal';
import history from '../../history';

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Modal showCross closeFn={() => history.goBack()} height={90} top={5}>
        <div className={s.root}>
          <div className={s.container}>
            <h1>{this.props.title}</h1>
            <p>...</p>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withStyles(s)(Register);
