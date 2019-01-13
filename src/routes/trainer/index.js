/* eslint-disable no-empty-pattern */
import React from 'react';
import { Layout } from '../../components/Layout';
import Trainer from './Trainer';

const title = 'Trainer';

function action(
  {
    /* params */
  },
) {
  // params.trainerId has trainer id
  return {
    chunks: ['trainer'],
    title,
    component: (
      <Layout>
        <Trainer />
      </Layout>
    ),
  };
}

export default action;
