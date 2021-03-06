import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../../../history';
import { ProgressiveImage } from '../../../ProgressiveImage';
import tinyImage from '../../../../images/tiny_gym1.jpg';

import s from './imageBanner.component.css';

const ImageBanner = props => {
  const { imgSrc, imgAlt, buttonLabel, link } = props;
  return (
    <div className={s.imageBanner}>
      <ProgressiveImage
        tinyImage={tinyImage}
        src={imgSrc}
        alt={imgAlt}
        title={imgAlt}
      />
      <Button className={s.imgBtn} onClick={() => history.push(link)}>
        {buttonLabel}
      </Button>
    </div>
  );
};

ImageBanner.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default withStyles(s)(ImageBanner);
