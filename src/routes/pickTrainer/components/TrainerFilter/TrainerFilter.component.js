import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash/get';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Filter from './Filter/Filter.component';

import s from './TrainerFilter.component.css';

class TrainerFilter extends React.PureComponent {
  render() {
    const { className, data, preselect, onFilterUpdate } = this.props;
    return (
      <div className={classNames(s.container, className)}>
        {data.map((filter, i) => (
          <Filter
            data={filter}
            key={i}
            preselect={preselect[get(filter, 'name', '').toLowerCase()]}
            onFilterUpdate={onFilterUpdate}
          />
        ))}
      </div>
    );
  }
}

TrainerFilter.defaultProps = {
  className: '',
  preselect: {},
};

TrainerFilter.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  preselect: PropTypes.object,
  onFilterUpdate: PropTypes.func.isRequired,
};

export default withStyles(s)(TrainerFilter);
