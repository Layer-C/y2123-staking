import { ServerSidePropNames, serverSidePropsContext } from 'contexts';
import React from 'react';

export const useServerSideProps = (name?: ServerSidePropNames, data?: any) => {
  const { props: _props, setProps: _setProps } = React.useContext(serverSidePropsContext);

  const props = React.useMemo(() => (name ? _props[name] : _props), [_props, name]);

  const setProps = React.useCallback(
    value => (name ? _setProps(prev => ({ ...prev, [name]: value })) : _setProps),
    [_setProps, name]
  );

  React.useEffect(() => {
    if (data) {
      setProps(data);
    }
  }, [data, setProps]);

  return { props, setProps };
};
