import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';
// import { ErrorMessage } from '../../fields';

export type FormFieldProps = {
  rules?: RegisterOptions;
  name: string;
  noErrorMessage?: boolean;
  errorGroup?: string[];
  className?: string;
  inputClassName?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  defaultValue?: any;
  valueAsChecked?: boolean;
  value?: any;
  emptyValue?: any;
  defaultChecked?: boolean;
};

export type Props<T = any> = FormFieldProps & {
  component: React.ComponentType<T>;
} & T;

export const Field = <T,>({
  component,
  name,
  rules,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  defaultValue,
  className,
  inputClassName,
  noErrorMessage,
  valueAsChecked,
  value: valueProp,
  errorGroup = [],
  emptyValue = '',
  defaultChecked,
  ...restProps
}: Props<T>) => {
  const Component = component;

  const {
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    setError,
  } = useFormContext();

  const {
    field: { onChange, onBlur, value, ...restField },
  } = useController({ name, rules });

  React.useEffect(() => {
    if ((defaultValue || emptyValue) && !value) {
      setValue(name, defaultValue || emptyValue, { shouldDirty: false });
    }

    if (defaultChecked) {
      setValue(name, true, { shouldDirty: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorMessage = get(errors, name)?.message;

  const hasGroupError = errorGroup.reduce((acc, cur) => acc && get(errors, cur)?.message, false);

  const values = errorGroup.map(name => getValues(name));

  React.useEffect(() => {
    if (hasGroupError) {
      errorGroup.forEach(name => clearErrors(name));
    } else {
      errorGroup.forEach(name => setError(name, { message: errorMessage }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearErrors, errorMessage, setError, ...errorGroup, ...values]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    onChange(e);
    onChangeProp?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    onBlur();
    onBlurProp?.(e);
  };

  const resolveValue = () => {
    const _value = valueAsChecked ? valueProp : value;

    if (rules?.valueAsNumber) {
      return +_value;
    }

    if (rules?.valueAsDate) {
      return new Date(_value);
    }

    return _value;
  };

  return (
    <div className={classNames('vs-form-field', className)}>
      <Component
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!errorMessage || hasGroupError}
        className={inputClassName}
        value={resolveValue() ?? emptyValue}
        checked={valueAsChecked && !!value}
        {...restField}
        {...(restProps as any)}
      />
      {/* {errorMessage && !noErrorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} */}
    </div>
  );
};
