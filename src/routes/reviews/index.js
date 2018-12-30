import React from 'react';
import { Layout } from '../../components/Layout';
import Reviews from './Reviews';

const title = 'Reviews';

function action() {
  return {
    chunks: ['reviews'],
    title,
    component: (
      <Layout>
        <Reviews />
      </Layout>
    ),
  };
}

export default action;
