/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Card from '@material-ui/core/Card';
import backgroundImg from '../../images/gym1.jpg';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import data from './data/about.data.json';

import s from './About.css';

class About extends React.Component {
  render() {
    return (
      <div>
        <Header defaultTab={1} background={backgroundImg} data={data} />
        <div className={s.container}>
          <Card className={s.card}>
            <h5 className={s.title}>About Pelvan</h5>
            <div>
              <p>
                Our story is inspired from a true story. There were 2 friends
                who kept themselves busy for years working extremely hard in the
                gym making little to no progress. They worked really hard, but
                they partied harder. Both of them had nice little beer bellies,
                fooling no ladies. They pooled their savings and hired an
                expensive personal trainer for 1 hour, six days a week. 30
                minutes everyday were spent on Cardio with trainer standing by
                and chatting with his buddies. They got personalized meal plan,
                but the trainer wasn&apos;t able to motivate them to stick to
                it. 6 months of work with the trainer and not much progress.
                These 2 friends realized too many people are facing this problem
                and started Pelvan with a single goal: Nobody should be unable
                to reach their fitness goals due to lack of proper guidance.
              </p>
              <p>
                Here we will provide you highly competent trainers at affordable
                prices, who will work with you day and night, motivate you and
                track your progress to keep you on track
              </p>
            </div>
          </Card>
          <Card className={classnames(s.card, s.videoCard)}>
            <p className={s.videoCaption}>
              Our Mission. Bring the best fitness guidance to everybody
            </p>
            <video
              autoPlay
              muted
              loop
              className={s.video}
              poster="https://s3.amazonaws.com/nikeinc-vendor-assets/about/About-Landing-Movie.jpg"
            >
              <source
                src="https://s3.amazonaws.com/nikeinc-vendor-assets/about/About-Landing-Movie.mp4"
                type="video/mp4"
              />
              Your browser does not support HTML5 video.
            </video>
          </Card>
          <Card className={s.card}>
            <h5 className={s.title}>Our Commitment</h5>
            <div>
              If you stick with us, we promise to stick with you. Our trainers
              will provide you the best guidance possible to get you in the best
              shape you can be. You will never be misguided, your time will not
              be wasted, and the focus will be on only and only <i>YOU</i>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(About);
