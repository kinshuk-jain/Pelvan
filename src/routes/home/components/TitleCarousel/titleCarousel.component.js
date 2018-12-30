import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { LightCarousel } from '../../../../components/Carousel';
import history from '../../../../history';

import s from './titleCarousel.component.css';

const Back = () => <i className="icon-chevron-left" />;
const Next = () => <i className="icon-chevron-right" />;

const TitleCarousel = props => {
  const { title, link, children } = props;
  return (
    <div className={s.carousel}>
      <div className={s.title}>{title}</div>
      <Button className={s.btn} onClick={() => history.push(link)}>
        View All
      </Button>
      <LightCarousel
        slidesToShow={2}
        gap={20}
        prevBtn={<Back />}
        nextBtn={<Next />}
        infinite
      >
        {children}
      </LightCarousel>
    </div>
  );
};

TitleCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default withStyles(s)(TitleCarousel);
