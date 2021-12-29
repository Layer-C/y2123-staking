import { Header } from './Header';
import { MainContent } from './MainContent';
import Image from 'next/image';

type Props = {
  children?: React.ReactNode;
  background?: string;
};

export const AppLayout = ({ children, background }: Props) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {!!background && (
        <Image alt={process.env.NEXT_PUBLIC_NFT_NAME} src={background} layout='fill' objectFit='cover' quality={100} />
      )}
      {children}
    </div>
  );
};

AppLayout.Header = Header;
AppLayout.MainContent = MainContent;
