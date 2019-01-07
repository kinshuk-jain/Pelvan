import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { LightCarousel } from '../../Carousel';
import history from '../../../history';

import s from './titleCarousel.component.css';

const Back = () => <i className="icon-chevron-left" />;
const Next = () => (
  <i className="icon-chevron-right" style={{ paddingLeft: '8px' }} />
);

const TitleCarousel = props => {
  const {
    title,
    link,
    children,
    className,
    slidesToShow,
    href,
    ...options
  } = props;
  return (
    <div className={classNames(s.carousel, className)}>
      <div className={s.title}>{title}</div>
      <Button
        className={s.btn}
        href={href}
        onClick={href || !link ? () => {} : () => history.push(link)}
      >
        View All
      </Button>
      <LightCarousel
        slidesToShow={slidesToShow}
        gap={20}
        prevBtn={<Back />}
        nextBtn={<Next />}
        infinite
        {...options}
      >
        {children}
      </LightCarousel>
    </div>
  );
};

TitleCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  className: PropTypes.string,
  slidesToShow: PropTypes.number,
  href: PropTypes.string,
};

TitleCarousel.defaultProps = {
  className: '',
  slidesToShow: 2,
  href: '',
  link: '',
};

export default withStyles(s)(TitleCarousel);
