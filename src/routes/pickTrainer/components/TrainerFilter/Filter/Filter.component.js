/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Filter.component.css';

class Filter extends React.PureComponent {
  state = {
    data: this.props.data,
  };

  handleKeyDown = e => {
    const text = e.target.value;
    this.setState((state, props) => {
      if (!text) {
        return { data: this.props.data };
      }
      return {
        data: {
          ...state.data,
          options: props.data.options.filter(
            option => option.toString().indexOf(text) !== -1,
          ),
        },
      };
    });
  };

  handleOnChange = (e, name, option) => {
    this.props.onFilterUpdate(name, option, !e.target.checked);
  };

  includesCaseInsensitive = (key, aggregate) => {
    const newKey = key.toString().toLowerCase();
    if (Array.isArray(aggregate)) {
      return aggregate.some(value => value.toString().toLowerCase() === newKey);
    }
    return newKey === aggregate.toString().toLowerCase();
  };

  render() {
    const { data } = this.state;
    const { preselect } = this.props;
    return (
      <div className={s.filterContainer}>
        <div className={s.filterTitle}>{data.name}</div>
        <input
          type="search"
          placeholder={`Search ${data.name}`}
          className={s.filterSearch}
          onKeyUp={this.handleKeyDown}
        />
        {data.options.map((option, ind) => (
          <div key={ind}>
            <input
              type="checkbox"
              id={option}
              name={option}
              defaultChecked={this.includesCaseInsensitive(option, preselect)}
              onClick={e => this.handleOnChange(e, data.name, option)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    );
  }
}

Filter.defaultProps = {
  preselect: '',
};

Filter.propTypes = {
  data: PropTypes.object.isRequired,
  preselect: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  onFilterUpdate: PropTypes.func.isRequired,
};

export default withStyles(s)(Filter);
