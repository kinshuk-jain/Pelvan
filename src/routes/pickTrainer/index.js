import React from 'react';
import { Layout } from '../../components/Layout';
import PickTrainer from './PickTrainer';

const title = 'Choose a Trainer';

function action() {
  return {
    chunks: ['pickTrainer'],
    title,
    component: (
      <Layout>
        <PickTrainer title={title} />
      </Layout>
    ),
  };
}

export default action;
