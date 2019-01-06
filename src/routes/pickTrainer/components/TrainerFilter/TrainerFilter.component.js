import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Filter from './Filter/Filter.component';

import s from './TrainerFilter.component.css';

class TrainerFilter extends React.PureComponent {
  render() {
    const { className, data } = this.props;
    return (
      <div className={classNames(s.container, className)}>
        {data.map((filter, i) => <Filter data={filter} key={i} />)}
      </div>
    );
  }
}

TrainerFilter.defaultProps = {
  className: '',
};

TrainerFilter.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
};

export default withStyles(s)(TrainerFilter);
