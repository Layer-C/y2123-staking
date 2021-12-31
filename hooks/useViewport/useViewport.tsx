import React from 'react';

type Viewport = 'sm' | 'xl';

export const useViewport = () => {
  const [viewport, setViewport] = React.useState<Viewport>('xl');

  React.useEffect(() => {
    if (window.innerWidth <= 576) {
      setViewport('sm');
    }
  }, []);

  return React.useMemo(() => ({ viewport }), [viewport]);
};
