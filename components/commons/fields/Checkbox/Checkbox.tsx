import classNames from 'classnames';
import React from 'react';
import { ClassName, HTMLInputProps } from 'types';
import { GroupContext, GroupProvider } from './Group/Group';

type RenderPropState = {
  isChecked: boolean;
  error?: boolean;
};

export type Props = Pick<HTMLInputProps, 'onChange' | 'checked'> &
  ClassName & {
    ref?: React.Ref<HTMLInputElement>;
    label?: React.ReactNode;
    error?: boolean;
    disabled?: boolean;
    value?: string;
    children?: (state: RenderPropState) => React.ReactNode;
  };

export const Checkbox = React.forwardRef(
  (
    {
      disabled,
      label,
      className,
      error,
      onChange: onChangeProp,
      value: valueProp = '',
      checked,
      children,
      ...restProps
    }: Props,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const groupProviderValue = React.useContext<GroupProvider>(GroupContext);

    const [_isChecked, setIsChecked] = React.useState(
      groupProviderValue ? groupProviderValue.value.includes(valueProp) : checked
    );
    const isChecked =
      (groupProviderValue ? groupProviderValue.value.includes(valueProp) : checked) || _isChecked || false;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      onChangeProp?.(e);

      setIsChecked(e.target.checked);
      groupProviderValue?.handleChange(e);
    };

    return (
      <label className={classNames('vs-checkbox', className)}>
        <input
          className='minimized'
          type='checkbox'
          checked={isChecked}
          onChange={checked ? onChangeProp : handleChange}
          {...restProps}
          ref={ref}
          disabled={disabled}
          value={valueProp as any}
        />
        {children?.({ isChecked, error })}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
