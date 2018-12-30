import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import s from './reviewCard.component.css';

const ReviewCardComponent = ({ className, title, subtitle, review, img }) => (
  <Card classes={{ root: className }}>
    <CardMedia
      component="img"
      className={s.icon}
      alt="Contemplative Reptile"
      height="140"
      image={img}
      title="Contemplative Reptile"
    />
    <CardContent>
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
};

ReviewCardComponent.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  review: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(s)(ReviewCardComponent);
