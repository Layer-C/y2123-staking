import { Children } from 'types';
import { Header } from './Header';
import { MainContent } from './MainContent';
import { Section } from './Section';

type Props = Children & {
  background?: string;
};

export const AppLayout = ({ children, background }: Props) => {
  return (
    <div className='flex flex-col min-h-screen bg-cover' style={{ backgroundImage: `url(${background})` }}>
      {children}
    </div>
  );
};

AppLayout.Header = Header;
AppLayout.MainContent = MainContent;
AppLayout.Section = Section;
