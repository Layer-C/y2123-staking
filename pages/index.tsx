import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from 'components/Layout';
import Prose from 'components/Prose';
import Minting from 'components/Minting';

const Home: NextPage = () => {
  return (
    <Layout>
      <Prose>
        <Minting />
      </Prose>
    </Layout>
  );
};

export default Home;
