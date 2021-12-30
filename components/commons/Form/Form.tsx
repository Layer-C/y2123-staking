import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './Checkbox/Group';

type Props<T = any> = Omit<
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  'onSubmit'
> & {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<T>;
  methods: UseFormReturn<T>;
};

const FormForceRerendererContext = React.createContext(() => null);

export const Form = <TFieldValues extends FieldValues>({
  children,
  onSubmit,
  methods,
  ...props
}: Props<TFieldValues>) => {
  const [_, setState] = React.useState(false);

  const value = React.useCallback(() => setState(p => !p), [setState]);

  return (
    <FormForceRerendererContext.Provider value={value as any}>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit && methods.handleSubmit(onSubmit)} {...props}>
          {children}
        </form>
      </FormProvider>
    </FormForceRerendererContext.Provider>
  );
};

Form.Checkbox = Checkbox;
Form.CheckboxGroup = CheckboxGroup;

export const useFormForceRerenderer = () => React.useContext(FormForceRerendererContext);
