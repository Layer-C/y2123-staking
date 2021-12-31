import { useControllable } from 'hooks';
import React from 'react';
import { Props as InputProps } from '../Input';

type Props = Omit<InputProps, 'ref' | 'size'>;

export const NumberInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      max,
      defaultValue,
      allowNegative = true,
      name,
      onBlur,
      min,
      separator: separatorProp,
      onKeyDown,
      value: valueProp,
      onChange,
      valueAs,
      changeAs,
      ...restProps
    },
    ref
  ) => {
    const resolveSeparator = (): string => {
      if (separatorProp === true || separatorProp === undefined) {
        return ',';
      }

      if (separatorProp === false) {
        return '';
      }

      return separatorProp;
    };

    const separator = resolveSeparator();

    const [value, setValue] = useControllable({
      value: valueProp?.toString(),
      onChange,
      defaultValue: defaultValue?.toString(),
      valueAs,
      changeAs,
    });

    const transformNumberToDisplayValue = (val = '') => {
      if (val === '') return val;

      const absoluteVal = Math.abs(+val).toString();
      const [whole, decimal] = absoluteVal.split('.');
      const segmentsCount = whole.length / 3;
      const segments = new Array(Math.ceil(segmentsCount)).fill(null).reduce((acc, _, idx) => {
        // number of digits per segment is 3
        return [whole.slice(Math.max(whole.length - (idx + 1) * 3, 0), whole.length - idx * 3), ...acc];
      }, []);

      if (allowNegative && val.startsWith('-')) {
        segments[0] = '-' + segments[0];
      }

      if (val.includes('.')) return segments.join(separator) + '.' + (decimal || '');

      return segments.join(separator);
    };

    const transformDisplayValueToNumber = (val = '') => {
      const error = new Error('Invalid number');

      if (val === '') return val;

      if (allowNegative) {
        if (val === '-') return '-0';
      } else {
        if (val.startsWith('-')) throw error;
      }

      const valWithoutSeparator = val.split(separator).join('');

      if (Number.isNaN(+valWithoutSeparator)) throw error;

      const absoluteVal = Math.abs(+valWithoutSeparator).toString();

      if (allowNegative && val.startsWith('-')) {
        return '-' + absoluteVal;
      }

      return absoluteVal;
    };

    const doChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let eventValue = event.target.value.trim();
      if (!eventValue && min !== undefined) {
        eventValue = min.toString();
      }

      try {
        let newValue = transformDisplayValueToNumber(eventValue);

        if (min !== undefined && +newValue < +min) {
          newValue = min?.toString();
        }

        if (max !== undefined && +newValue > +max) {
          newValue = max?.toString();
        }

        event.target.value = newValue;

        setValue?.(event);

        return newValue;
      } catch {
        return value;
      }
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
      const eventValue = event.target.value;

      const caret = event.target.selectionStart;
      const element = event.target;

      const newValue = doChange(event);
      const newDisplayValue = transformNumberToDisplayValue(newValue);

      window.requestAnimationFrame(() => {
        element.selectionStart = (caret || 0) + newDisplayValue.length - eventValue.length;
        element.selectionEnd = (caret || 0) + newDisplayValue.length - eventValue.length;
      });
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
      const displayValue = event.target.value;

      const value = transformDisplayValueToNumber(displayValue);

      event.target.value = value;

      onBlur?.(event);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
      if (e.key === 'Backspace' && (e.target as any).value === '-0') {
        (e.target as any).value = '';
      }

      onKeyDown?.(e);
    };

    const displayValue = transformNumberToDisplayValue(value);

    return (
      <input
        ref={ref}
        className={className}
        type='text'
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        name={name}
        {...restProps}
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';
