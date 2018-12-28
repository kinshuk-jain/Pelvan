import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import backgroundImg from '../../images/gym1.png';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CardList } from '../../components/CardList';
import { ImageBanner } from '../../components/ImageBanner';
import { OurTrainers, TitleCarousel } from './components';
import data from './data/home.data.json';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header background={backgroundImg} data={data} />
        <div className={s.container}>
          <CardList />
          <OurTrainers data={data.trainers} />
          <ImageBanner
            imageAlt={data.banner.alt}
            imgSrc={data.banner.img}
            buttonLabel={data.banner.label}
            href={data.banner.link}
          />
          <TitleCarousel title="reviews" onButtonClick={() => {}} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Home);
