import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from '../../../Link';
import s from './progressiveImage.component.css';

const ProgressiveImage = ({
  link,
  tinyImage,
  src,
  alt,
  title,
  srcset,
  sizes,
  className,
}) => {
  let additionalProps = {};
  if (link) {
    additionalProps = {
      to: link,
      'data-href': src,
    };
  }
  return (
    <Link
      className={classnames('progressive replace', s.progressive, className)}
      to={src}
      data-srcset={srcset}
      data-sizes={sizes}
      {...additionalProps}
    >
      <img src={tinyImage} alt={alt} title={title} className={s.preview} />
    </Link>
  );
};

ProgressiveImage.defaultProps = {
  link: '',
  className: '',
  sizes: '',
  srcset: '',
};

ProgressiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  link: PropTypes.string,
  tinyImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
};

export default withStyles(s)(ProgressiveImage);
