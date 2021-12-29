import { AppLayout } from 'components';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <AppLayout background='/dashboard-background.png'>
      <AppLayout.Header title='Dashboard' className='bg-purplish-gray-2'></AppLayout.Header>
      <AppLayout.MainContent />
    </AppLayout>
  );
};

export default Home;
