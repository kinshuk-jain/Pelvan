import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import s from './reviewCard.component.css';

const ReviewCardComponent = ({
  className,
  title,
  subtitle,
  review,
  img,
  alt,
}) => (
  <Card classes={{ root: className }}>
    <CardMedia
      component="img"
      className={s.icon}
      alt={alt}
      height="140"
      image={img}
      title={alt}
    />
    <CardContent classes={{ root: s.noBottomPadding }}>
      <Typography variant="h6" color="inherit" classes={{ root: s.title }}>
        {title}
      </Typography>
      <Typography
        color="textSecondary"
        classes={{ root: s.title }}
        gutterBottom
      >
        {subtitle}
      </Typography>
      <Tooltip title={review}>
        <blockquote>
          {review.length > 280 ? `${review.substring(0, 200)}...` : review}
        </blockquote>
      </Tooltip>
    </CardContent>
  </Card>
);

ReviewCardComponent.defaultProps = {
  className: '',
  subtitle: '',
  alt: 'image',
};

ReviewCardComponent.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  review: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default withStyles(s)(ReviewCardComponent);
