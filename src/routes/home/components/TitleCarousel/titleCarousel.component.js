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
  const { title, link } = props;
  return (
    <div className={s.carousel}>
      <div>{title}</div>
      <Button className={s.btn} onClick={() => history.push(link)}>
        View All
      </Button>
      <LightCarousel
        slidesToShow={2}
        gap={20}
        prevBtn={<Back />}
        nextBtn={<Next />}
      >
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </LightCarousel>
    </div>
  );
};

TitleCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.func.isRequired,
};

export default withStyles(s)(TitleCarousel);
