import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Card from '@material-ui/core/Card';

import s from './breadcrumb.component.css';

class BreadCrumbComponent extends Component {
  static defaultProps = {
    render: () => {},
  };

  render() {
    const { data } = this.props;
    return (
      <Card classes={{ root: `${s.breadCrumbContainer}` }}>
        <p className={s.subTitle}>{data.subtitle}</p>
        <div className={s.title}>{data.title.toUpperCase()}</div>
        {this.props.render()}
      </Card>
    );
  }
}

BreadCrumbComponent.propTypes = {
  render: PropTypes.func,
  data: PropTypes.object.isRequired,
};

export default withStyles(s)(BreadCrumbComponent);
