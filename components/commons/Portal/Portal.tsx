import React from 'react';
import { createPortal } from 'react-dom';
import { Children } from 'types';

type Props = Children;

export const Portal = ({ children }: Props) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.body) : null;
};
