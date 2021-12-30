import React from 'react';
import { CheckboxGroup as BaseCheckboxGroup, CheckboxGroupProps } from '../../../fields';
import { Field, FormFieldProps } from '../../Field';

export type Props<T = any> = CheckboxGroupProps & FormFieldProps;

export const Group = <T,>(props: Props<T>) => {
  return <Field component={BaseCheckboxGroup} {...props} />;
};
