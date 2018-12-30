import React from 'react';
import { Layout } from '../../components/Layout';
import About from './About';

const title = 'About Us';

function action() {
  return {
    chunks: ['about'],
    title,
    component: (
      <Layout>
        <About title={title} />
      </Layout>
    ),
  };
}

export default action;
