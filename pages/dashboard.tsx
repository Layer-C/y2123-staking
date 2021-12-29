import { AppLayout } from 'components/AppLayout';
import type { NextPage } from 'next';
import dashboardBackground from 'public/dashboard-background.png';

const Home: NextPage = () => {
  return (
    <AppLayout background={dashboardBackground}>
      <AppLayout.Header title='Dashboard' className='bg-purplish-gray-2'></AppLayout.Header>
      <AppLayout.MainContent />
    </AppLayout>
  );
};

export default Home;
