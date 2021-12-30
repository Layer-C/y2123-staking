import React from 'react';
import { VisibilityControl } from 'types';

export type Props = {
  defaultVisible?: boolean;
  onHide?: () => void;
  onShow?: () => void;
};

export const useVisibilityControl = (props?: Props) => {
  const { onHide, onShow } = props || {};
  const [isActive, setIsActive] = React.useState(!!props?.defaultVisible);

  const show = React.useCallback(() => {
    setIsActive(true);
    onShow?.();
  }, [onShow]);

  const hide = React.useCallback(() => {
    setIsActive(false);
    onHide?.();
  }, [onHide]);

  const toggle = React.useCallback(() => {
    setIsActive(prev => {
      if (prev) {
        onHide?.();
      } else {
        onShow?.();
      }

      return !prev;
    });
  }, [onHide, onShow]);

  return React.useMemo<VisibilityControl>(
    () => ({ show, hide, visible: isActive, toggle }),
    [show, hide, isActive, toggle]
  );
};
