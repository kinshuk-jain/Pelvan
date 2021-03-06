import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import get from 'lodash/get';
import { FixedHeader } from '../../../../components/FixedHeader';
import { Footer } from '../../../../components/Footer';
import { Review, Skill } from '../index';

import s from './TrainerPage.css';

class TrainerPage extends React.Component {
  state = {
    showMoreSkills: false,
  };

  showMoreSkillsClickHandler = () => {
    // console.log('clicked');
    this.setState(state => ({
      ...state,
      showMoreSkills: !state.showMoreSkills,
    }));
  };

  // TODO: implement show all reviews
  renderReviews = () => {
    const { data } = this.props;
    const reviews = get(data, 'reviews', []);
    return (
      <Card className={s.card}>
        <CardHeader title="Reviews" />
        <CardContent>
          {reviews
            .slice(0, 10)
            .map((review, i) => <Review data={review} key={i} />)}
          {data.numReviews > 10 ? (
            <div className={s.showAllReviews}>
              Show all {data.numReviews} reviews
            </div>
          ) : null}
        </CardContent>
      </Card>
    );
  };

  renderSkills = () => {
    const { data } = this.props;
    const { showMoreSkills } = this.state;
    const skills = get(data, 'skills', []);
    return (
      <Card className={s.card}>
        <CardHeader title="Skills" />
        <CardContent>
          {!showMoreSkills &&
            skills
              .slice(0, 3)
              .map((skill, i) => <Skill data={skill} key={i} />)}
          {showMoreSkills && skills.length > 5
            ? skills.map((skill, i) => (
                <div className={s.skillWrapper} key={i}>
                  <Skill data={skill} />
                </div>
              ))
            : showMoreSkills &&
              skills.map((skill, i) => <Skill data={skill} key={i} />)}
          {skills.length > 3 ? (
            <div
              className={s.showMore}
              onClick={this.showMoreSkillsClickHandler}
            >
              Show {showMoreSkills ? 'Less' : 'More'}
            </div>
          ) : null}
        </CardContent>
      </Card>
    );
  };

  renderExp = () => {
    const { data = {} } = this.props;
    const { experience = [], education = [] } = data;

    return (
      <Card className={s.card}>
        <CardHeader title="Experience" />
        <CardContent>
          {experience.map((exp, i) => (
            <React.Fragment key={i}>
              <div className={s.title}>{exp.title}</div>
              <div className={s.school}>{exp.company}</div>
              <div className={s.year}>{exp.time}</div>
              <div className={s.achievement}>{exp.achievement}</div>
              {experience.length !== i + 1 && <Divider variant="middle" />}
            </React.Fragment>
          ))}
        </CardContent>
        <Divider />
        <CardHeader title="Education" />
        <CardContent>
          {education.map((edu, i) => (
            <React.Fragment key={i}>
              <div className={s.title}>{edu.school}</div>
              <div className={s.school}>{edu.school}</div>
              <div className={s.year}>{edu.year}</div>
              <div className={s.achievement}>{edu.achievement}</div>
              {education.length !== i + 1 && <Divider variant="middle" />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    );
  };

  render() {
    const { data = {} } = this.props;
    return (
      <div>
        <FixedHeader />
        <div className={s.container}>
          <Card className={s.card}>
            <CardContent>
              Profile: {JSON.stringify(data.profile)}
              Contact: {JSON.stringify(data.contact)}
            </CardContent>
          </Card>
          {this.renderExp()}
          {this.renderSkills()}
          {this.renderReviews()}
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
