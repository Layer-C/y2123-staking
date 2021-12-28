import React from 'react';
import { useRouter } from 'next/router';

export const useScrollToTop = () => {
  const { pathname } = useRouter();

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
