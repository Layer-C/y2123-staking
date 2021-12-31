import classNames from 'classnames';
import React from 'react';
import { ClassNameUtils } from 'utils';
import { useControllable, useStateToggle } from 'hooks';
import { HTMLInputProps, ValueTransformProps } from 'types';
import { NumberInput } from './Number';

type BaseInputProps = Omit<HTMLInputProps, 'ref' | 'type' | 'size' | 'css'> &
  ValueTransformProps & {
    ref?: React.Ref<HTMLInputElement>;
  };

type InputType = 'email' | 'file' | 'hidden' | 'number' | 'password' | 'tel' | 'text';

export type Props = BaseInputProps & {
  label?: string;
  error?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  innerLeft?: React.ReactNode;
  innerRight?: React.ReactNode;
  htmlType?: InputType;
  trimOnBlur?: boolean;
  allowConsecutiveSpaces?: boolean;
  onEnterPress?: () => void;
  allowNegative?: boolean;
  type?: 'default' | 'underline';
  size?: 'sm' | 'md';
  separator?: string | boolean;
  pattern?: string;
};

export const Input = React.forwardRef(
  (
    {
      label,
      className,
      error,
      htmlType = 'text',
      addonAfter,
      addonBefore,
      innerLeft,
      innerRight,
      onFocus,
      onBlur,
      value: valueProp,
      onChange: onChangeProp,
      trimOnBlur = true,
      allowConsecutiveSpaces = true,
      onEnterPress,
      onKeyDown,
      type = 'default',
      size = 'md',
      valueAs,
      changeAs,
      ...props
    }: Props,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [value, setValue] = useControllable({ value: valueProp, onChange: onChangeProp, valueAs, changeAs });

    const inputRef = React.useRef<HTMLInputElement>(null);

    // temporary solution until JIT is enabled
    const [isFocused, toggleFocus] = useStateToggle();

    const { name, pattern } = props;

    if (pattern) {
      props = {
        ...props,
        pattern,
        onInput: (ev: React.ChangeEvent<HTMLInputElement>) => {
          if (!ev.target.checkValidity()) {
            ev.target.value = value;
          }
        },
      };
    }

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
      onFocus?.(e);
      toggleFocus();
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
      e.persist();

      if (trimOnBlur) {
        e.target.value = e.target.value.trim();
        setValue(e);
      }

      if (!allowConsecutiveSpaces) {
        e.target.value = e.target.value.replace(/\s+/g, ' ');
        setValue(e);
      }

      onBlur?.(e);
      toggleFocus();
    };

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const renderInput = () => {
      const inputClassName = classNames(
        'h-full w-full m-0 px-2 placeholder-dark-gray-1::placeholder disabled:bg-light-gray-1 bg-transparent',
        'outline-none border-none',
        {
          'text-sm': size === 'md',
          'text-xs': size === 'sm',
        }
      );

      if (htmlType === 'number') {
        return (
          <NumberInput
            ref={ref}
            className={inputClassName}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeydown}
            value={value}
            onChange={setValue}
            valueAs={valueAs}
            changeAs={changeAs}
          />
        );
      }

      return (
        <input
          ref={inputRef}
          className={inputClassName}
          type={htmlType}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeydown}
          value={value}
          onChange={setValue}
        />
      );
    };

    const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = e => {
      onKeyDown?.(e);

      if (e.key === 'Enter') {
        onEnterPress?.();
      }
    };

    const isHidden = htmlType === 'hidden';

    return (
      <div
        className={ClassNameUtils.withTwReplaceable('w-')(
          'w-full max-w-full relative overflow-hidden',
          'border-dark-gray-1 border-solid',
          {
            minimized: isHidden,
            border: type === 'default',
            'border-b': type === 'underline',
            'border-blue-1': isFocused,
            'border-error': error,
          },
          className
        )}>
        {!!label && <label htmlFor={name}>{label}</label>}
        <div
          className={ClassNameUtils.withTwReplaceable('h-', 'w-')('w-full flex relative', {
            'h-11': size === 'md',
            'h-7.5': size === 'sm',
          })}>
          {addonBefore && (
            <div
              className={classNames(
                'bg-light-gray-2 flex items-center px-2.5 flex-shrink-0',
                'border-r border-solid',
                { 'border-border': !isFocused && !error },
                { 'border-dark-gray-2': isFocused, 'border-error': error }
              )}>
              {addonBefore}
            </div>
          )}
          <div className='flex items-center flex-1'>
            {!!innerLeft && (
              <div
                className={classNames('flex items-center h-full z-1 flex-shrink-0', {
                  'pl-4 pr-2': size === 'md',
                  'pl-2 pr-0': size === 'sm',
                })}>
                {innerLeft}
              </div>
            )}
            {renderInput()}
            {!!innerRight && <div className='flex items-center flex-shrink-0 h-full px-4 z-1'>{innerRight}</div>}
          </div>
          {addonAfter && (
            <div
              className={classNames('bg-light-gray-2 flex items-center px-2 flex-shrink-0', 'border-l border-solid', {
                'border-border': !isFocused && !error,
                'border-dark-gray-2': isFocused,
                'border-error': error,
              })}>
              {addonAfter}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
