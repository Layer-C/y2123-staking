import React, { FunctionComponent, useEffect, useState } from 'react';

const NoSSR: FunctionComponent = ({ children }): JSX.Element => {
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return <>{isMounted ? children : null}</>;
};

export default NoSSR;
