import React from 'react';
import { Children, ClassName } from 'types/common';
import { HTMLButtonProps } from 'types/htmlElements';
import { ClassNameUtils } from 'utils/className';

type Variant = 'link' | 'outline' | 'solid';

const primaryBackgroundColor: { [key in Variant]: string } = {
  link: 'bg-none',
  outline: 'bg-none',
  solid: 'bg-blue-1',
};

const secondaryBackgroundColor: { [key in Variant]: string } = {
  link: 'bg-none',
  outline: 'bg-none',
  solid: 'bg-purplish-black-1',
};

const defaultBackgroundColor: { [key in Variant]: string } = {
  link: 'bg-none',
  outline: 'bg-none',
  solid: 'bg-white',
};

const primaryBorderColor: { [key in Variant]: string } = {
  link: 'border-none',
  outline: 'border-blue-1',
  solid: 'border-none',
};

const secondaryBorderColor: { [key in Variant]: string } = {
  link: 'border-none',
  outline: 'border-purplish-black-1',
  solid: 'border-none',
};

const defaultBorderColor: { [key in Variant]: string } = {
  link: 'border-none',
  outline: 'border-white',
  solid: 'border-none',
};

const primaryTextColor: { [key in Variant]: string } = {
  link: 'text-blue-1',
  outline: 'text-blue-1',
  solid: 'text-white',
};

const secondaryTextColor: { [key in Variant]: string } = {
  link: 'text-purplish-black-1',
  outline: 'text-purplish-black-1',
  solid: 'text-white',
};

const defaultTextColor: { [key in Variant]: string } = {
  link: 'text-white',
  outline: 'text-white',
  solid: 'text-blue-1',
};

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children &
  ClassName &
  Pick<HTMLButtonProps, 'disabled' | 'type' | 'onClick'> & {
    variant?: Variant;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    colorScheme?: 'primary' | 'secondary' | 'default';
  };

export const Button = React.forwardRef<HTMLElement, Props>(
  (
    {
      variant = 'solid',
      size = 'md',
      colorScheme = 'primary',
      className,
      children,
      type = 'button',
      disabled,
      ...restProps
    },
    ref
  ) => {
    const backgroundColor = (() => {
      switch (colorScheme) {
        case 'primary':
          return primaryBackgroundColor[variant];
        case 'secondary':
          return secondaryBackgroundColor[variant];
        default:
          return defaultBackgroundColor[variant];
      }
    })();

    const borderColor = (() => {
      switch (colorScheme) {
        case 'primary':
          return primaryBorderColor[variant];
        case 'secondary':
          return secondaryBorderColor[variant];
        default:
          return defaultBorderColor[variant];
      }
    })();

    const textColor = (() => {
      switch (colorScheme) {
        case 'primary':
          return primaryTextColor[variant];
        case 'secondary':
          return secondaryTextColor[variant];
        default:
          return defaultTextColor[variant];
      }
    })();

    const outline = (() => {
      switch (variant) {
        case 'link':
          return 'bg-none';
        default:
          return 'shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
      }
    })();

    const fontWeight = (() => {
      switch (size) {
        case 'sm':
          return 'text-sm';
        default:
          return 'text-md';
      }
    })();

    const padding = (() => {
      switch (variant) {
        case 'link':
          return 'p-0';
        default:
          return 'px-5 py-2';
      }
    })();

    const fontFamily = (() => {
      switch (variant) {
        case 'link':
          return '';
        default:
          return 'font-disketMono font-bold';
      }
    })();

    return (
      <button
        {...restProps}
        type={type}
        className={ClassNameUtils.withTwReplaceable('px-', 'py-', 'bg-')(
          'inline-flex justify-center items-center border rounded select-none text-base',
          textColor,
          backgroundColor,
          borderColor,
          outline,
          fontWeight,
          padding,
          fontFamily,
          { 'bg-gray-1 text-black cursor-default pointer-events-none': disabled },
          className
        )}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
