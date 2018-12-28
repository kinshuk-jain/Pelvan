import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from '@material-ui/core/Button';
import { LightCarousel } from '../../../../components/Carousel';

import s from './ourTrainers.component.css';

const Back = () => <i className="icon-chevron-left" />;
const Next = () => <i className="icon-chevron-right" />;

class OurTrainers extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className={s.container}>
        <div className={s.header}>
          <h2>Our Trainers</h2>
          <Button className={s.viewAllBtn}>View all</Button>
        </div>
        <div className={s.carousel}>
          <LightCarousel
            slidesToShow={3}
            gap={20}
            prevBtn={<Back />}
            nextBtn={<Next />}
          >
            {data.map(trainer => (
              <div className={s.trainer}>
                <img
                  className={s.trainerImg}
                  src={trainer.img}
                  alt={trainer.alt}
                  onClick={trainer.link}
                />
              </div>
            ))}
          </LightCarousel>
        </div>
      </div>
    );
  }
}

OurTrainers.propTypes = {
  data: PropTypes.array.isRequired,
};

export default withStyles(s)(OurTrainers);
