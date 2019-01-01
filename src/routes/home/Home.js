import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import Button from '@material-ui/core/Button';
import get from 'lodash/get';
import s from './Home.css';
import backgroundImg from '../../images/gym1.jpg';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CardList } from '../../components/CardList';
import { ImageBanner } from '../../components/ImageBanner';
import { OurTrainers, TitleCarousel } from './components';
import { ReviewCard } from '../../components/ReviewCard';
import data from './data/home.data.json';

// const ChooseButton = () => (
//   <Button variant="contained" className={s.headerBtn} disableRipple>
//     Choose a Trainer
//   </Button>
// );

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header
          background={backgroundImg}
          data={data}
          // render={() => <ChooseButton />}
        />
        <div className={s.container}>
          <CardList />
          <OurTrainers data={data.trainers} />
          <ImageBanner
            imgAlt={data.banner.alt}
            imgSrc={data.banner.img}
            buttonLabel={data.banner.label}
            link={data.banner.link}
          />
          <TitleCarousel title="Reviews" link="/reviews">
            {get(data, 'reviews', []).map((review, i) => (
              <ReviewCard key={i} className={s.reviewCards} {...review} />
            ))}
          </TitleCarousel>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Home);
