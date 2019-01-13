import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FixedHeader } from '../../../../components/FixedHeader';
import { Footer } from '../../../../components/Footer';

import s from './TrainerPage.css';

class TrainerPage extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <FixedHeader />
        <div className={s.container}>
          <Card className={s.card}>
            <CardContent>Profile: {JSON.stringify(data.profile)}</CardContent>
          </Card>
          <Card className={s.card}>
            <CardContent>Contact: {JSON.stringify(data.contact)}</CardContent>
          </Card>
          <Card className={s.card}>
            <CardContent>
              Experience: {JSON.stringify(data.experience)}
            </CardContent>
          </Card>
          <Card className={s.card}>
            <CardContent>Skills: {JSON.stringify(data.skills)}</CardContent>
          </Card>
          <Card className={s.card}>
            <CardContent>Reviews: {JSON.stringify(data.reviews)}</CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
}

TrainerPage.propTypes = {
  data: PropTypes.object,
};

TrainerPage.defaultProps = {
  data: {},
};

export default withStyles(s)(TrainerPage);
