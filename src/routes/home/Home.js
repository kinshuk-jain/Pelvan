import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import backgroundImg from '../../images/gym1.png';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header background={backgroundImg} />
        <div className={s.container}>Home</div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Home);
