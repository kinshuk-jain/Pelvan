import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import s from './cardList.component.css';

import { Link } from '../../../Link';

const ImgCard = props => {
  const { data } = props;
  return (
    <div className={s.cardContent}>
      <img src={data.img} alt={data.alt} />
      <div className={s.overlay}>
        <Button
          variant="text"
          className={s.overlayBtn}
          classes={{ label: `${s.btnLabel}` }}
          disableFocusRipple
          disableRipple
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

ImgCard.propTypes = {
  data: PropTypes.object.isRequired,
};

class CardListComponent extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <Grid container spacing={16} className={s.cardList}>
        {data.map((info, index) => (
          <Grid item key={index} xs>
            <Card classes={{ root: `${s.card}` }}>
              {info.type === 'header' ? (
                [
                  <CardContent
                    key={1}
                    classes={{ root: `${s.headerCardContent}` }}
                  >
                    <h4>{info.title}</h4>
                    <p>{info.text}</p>
                  </CardContent>,
                  <Divider variant="middle" key={2} />,
                  <CardActions key={3}>
                    <Link to="/" className={s.showAll}>
                      Show All <i className="icon-chevron-right" />
                    </Link>
                  </CardActions>,
                ]
              ) : (
                <ImgCard data={info} />
              )}
            </Card>
            {!!info.label && <p className={s.cardLabel}>{info.label}</p>}
          </Grid>
        ))}
      </Grid>
    );
  }
}

CardListComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default withStyles(s)(CardListComponent);
