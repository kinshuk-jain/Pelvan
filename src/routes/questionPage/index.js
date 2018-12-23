import React from 'react';
import _ from 'lodash';

import { Layout } from '../../components/Layout';
import QuestionPage from './QuestionPage';

async function action({ params }) {
  return {
    chunks: ['questionPage'],
    title: 'Pelvan',
    component: (
      <Layout>
        <QuestionPage
          id={_.get(params, 'quesId', '')}
          title="what is bitcoin?"
        />
      </Layout>
    ),
  };
}

export default action;
