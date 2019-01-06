import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './TrainerFilter.component.css';

class TrainerFilter extends React.PureComponent {
  render() {
    const { className } = this.props;
    return <div className={classNames(s.container, className)}>Filter</div>;
  }
}

TrainerFilter.defaultProps = {
  className: '',
};

TrainerFilter.propTypes = {
  className: PropTypes.string,
};

export default withStyles(s)(TrainerFilter);
