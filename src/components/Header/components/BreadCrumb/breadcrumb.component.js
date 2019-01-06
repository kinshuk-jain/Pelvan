import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import s from './breadcrumb.component.css';

const ChooseButton = () => (
  <Button
    variant="contained"
    classes={{ root: `${s.headerBtn}` }}
    disableRipple
  >
    Choose a Trainer
  </Button>
);

class BreadCrumbComponent extends Component {
  static defaultProps = {
    showChooseTrainer: true,
  };

  render() {
    const { data, showChooseTrainer, render } = this.props;
    return (
      <Card classes={{ root: `${s.breadCrumbContainer}` }}>
        <p className={s.subTitle}>{data.subtitle}</p>
        <div className={s.title}>{data.title.toUpperCase()}</div>
        {showChooseTrainer && <ChooseButton />}
        {render()}
      </Card>
    );
  }
}

BreadCrumbComponent.propTypes = {
  showChooseTrainer: PropTypes.bool,
  data: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
};

export default withStyles(s)(BreadCrumbComponent);
