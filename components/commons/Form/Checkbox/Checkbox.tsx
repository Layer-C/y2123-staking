import React from 'react';
import { Checkbox as BaseCheckbox, CheckboxProps } from '../../fields';
import { Field, FormFieldProps } from '../Field';

export type Props<T = any> = CheckboxProps & FormFieldProps;

export const Checkbox = <T,>(props: Props<T>) => {
  return <Field component={BaseCheckbox} valueAsChecked {...props} />;
};
