import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.component.css';
import { Link } from '../../../Link';

class FooterComponent extends React.Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    footerText: PropTypes.string,
  };

  static defaultProps = {
    footerText: '',
  };

  render() {
    const { links = [], footerText = '' } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>© Pelvan</span>
          {links.map((link, i) => (
            <span key={i}>
              <span className={s.spacer}>·</span>
              <Link className={s.link} to={link.href}>
                {link.name}
              </Link>
            </span>
          ))}
        </div>
        <div className={s.container}>{footerText}</div>
      </div>
    );
  }
}

export default withStyles(s)(FooterComponent);
