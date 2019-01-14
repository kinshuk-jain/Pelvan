import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Divider from '@material-ui/core/Divider';

import s from './Skill.css';

const Skill = ({ data }) => (
  <React.Fragment>
    <div className={s.skill}>{data}</div>
    <Divider variant="middle" />
  </React.Fragment>
);

Skill.propTypes = {
  data: PropTypes.string.isRequired,
};

export default withStyles(s)(Skill);
