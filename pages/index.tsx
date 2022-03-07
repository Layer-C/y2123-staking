import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from 'components/Layout';
import Prose from 'components/Prose';
import Minting from 'components/Minting';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppLayout } from 'components/AppLayout';

const isRedirectToDashboard = true;

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (isRedirectToDashboard) {
      router.replace('/dashboard');
    }
  }, []);

  return isRedirectToDashboard ? (
    <AppLayout background='/dashboard-background.png'></AppLayout>
  ) : (
    <Layout>
      <Prose>
        <Minting />
      </Prose>
    </Layout>
  );
};

export default Home;
