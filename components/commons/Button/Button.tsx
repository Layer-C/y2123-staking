import { Children, ClassName } from 'types/common';
import { HTMLButtonProps } from 'types/htmlElements';
import { ClassNameUtils } from 'utils/className';
import { ConditionalWrapper } from '../ConditionalWrapper';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children &
  ClassName &
  Pick<HTMLButtonProps, 'disabled' | 'type' | 'onClick'> & {
    variant?: 'link' | 'outline' | 'solid' | 'link';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    colorScheme?: 'primary' | 'secondary';
    as?: 'button' | 'a' | React.ComponentType;
  } & { [key in string]?: any };

export const Button = ({
  variant = 'solid',
  size = 'md',
  colorScheme = 'primary',
  className,
  children,
  type = 'button',
  ...restProps
}: Props) => {
  const textColor = (() => {
    switch (variant) {
      case 'link':
        return 'text-blue-1';
      default:
        return 'text-white';
    }
  })();

  const backgroundColor = (() => {
    switch (variant) {
      case 'solid':
        return 'bg-blue-1';
      case 'link':
        return 'bg-none';
      default:
        return 'bg-blue-1';
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
    <ConditionalWrapper
      active={true}
      component={restProps.as || 'button'}
      {...restProps}
      type={type}
      className={ClassNameUtils.withTwReplaceable('px-', 'py-')(
        'inline-flex justify-center items-center border border-transparent rounded',
        textColor,
        backgroundColor,
        outline,
        fontWeight,
        padding,
        fontFamily,
        className
      )}>
      {children}
    </ConditionalWrapper>
  );
};
