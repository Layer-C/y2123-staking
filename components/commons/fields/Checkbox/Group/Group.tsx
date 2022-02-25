import { noop } from 'lodash';
import React from 'react';
import { useControllable } from 'hooks';

type OwnProps<T = any> = {
  onChange?: (value: T[]) => void;
  value?: T[];
  name?: string;
  defaultValue?: T[];
  error?: boolean;
};

export type Props = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'ref' | keyof OwnProps
> &
  OwnProps;

export type GroupProvider = {
  groupProps?: Props;
  value: string[];
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const GroupContext = React.createContext<GroupProvider>({
  groupProps: undefined,
  value: [],
  handleChange: noop,
});

export const Group = React.forwardRef((props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
  const { onChange: onChangeProp, defaultValue = [], value: valueProp, name, children, error, ...restProps } = props;

  const [value, setValue] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const eventValue = e.target.value as any;
      const isChecked = e.target.checked;

      let newValue;
      if (isChecked) {
        newValue = [...value, eventValue];
      } else {
        newValue = value?.filter((value: any) => value !== eventValue);
      }

      onChangeProp?.(newValue);

      setValue(newValue);
    },
    [onChangeProp, setValue, value]
  );

  const providerValue = React.useMemo(() => ({ handleChange, value, groupProps: props }), [handleChange, props, value]);

  return (
    <GroupContext.Provider value={providerValue}>
      <div {...restProps}>
        <input ref={ref} name={name} className='minimized' />
        {children}
      </div>
    </GroupContext.Provider>
  );
});

Group.displayName = 'CheckboxGroup';
