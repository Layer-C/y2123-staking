import classNames from 'classnames';
import { useControllable, useVisibilityControl } from 'hooks';
import noop from 'lodash/noop';
import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Children, ClassName } from 'types';
import { ClassNameUtils } from 'utils';
import { Item as BaseItem, ItemProps as BaseItemProps } from './Item';

export type BaseProps<T = any> = Children & {
  value?: T;
  onChange?: (value: T) => void;
};

type TabsProvider<T> = {
  handleChange: (value: T) => void;
  value: T;
};

export const TabsContext = React.createContext<TabsProvider<any>>({ value: undefined, handleChange: noop });

const BaseTabs = <T,>({ value: valueProp, onChange, children }: BaseProps<T>) => {
  const [value, setValue] = useControllable({ value: valueProp, onChange });

  const providerValue: TabsProvider<T> = React.useMemo(() => ({ value, handleChange: setValue }), [setValue, value]);

  return <TabsContext.Provider value={providerValue}>{children}</TabsContext.Provider>;
};

export type TabData = {
  label: React.ReactNode;
  value: string;
  content: React.ReactNode;
};

type Props = BaseProps &
  ClassName &
  Children & {
    tabs: TabData[];
    collapsible?: boolean;
  };

export const Tabs = ({ value: valueProp, onChange, className, tabs, collapsible }: Props) => {
  const [value, setValue] = useControllable({ value: valueProp, onChange, defaultValue: tabs[0]?.value });
  const control = useVisibilityControl({ defaultVisible: true });

  return (
    <BaseTabs
      value={value}
      onChange={v => {
        setValue(v);
        control.show();
      }}>
      <div className={classNames('border-b border-solid flex justify-between items-center border-gray-1', className)}>
        <div className={ClassNameUtils.withTwReplaceable('px-')('flex items-center flex-shrink-0')}>
          {tabs.map(({ label, value }) => (
            <Item key={value} value={value}>
              {label}
            </Item>
          ))}
        </div>
        {!!collapsible && (
          <div className='p-2 cursor-pointer select-none'>
            {control.visible ? <FaChevronUp onClick={control.hide} /> : <FaChevronDown onClick={control.show} />}
          </div>
        )}
      </div>
      <div
        className={classNames('h-full py-5 overflow-hidden', { 'h-0 py-0': collapsible && !control.visible })}
        key={value}>
        {tabs.find(tab => tab.value === value)?.content}
      </div>
    </BaseTabs>
  );
};

type ItemProps = Omit<BaseItemProps, 'children'> & ClassName & Children;

const Item = ({ children, value }: ItemProps) => {
  return (
    <BaseItem value={value} key={value}>
      {({ isActive, onClick }) => (
        <div
          onClick={onClick}
          className={classNames('flex items-center justify-center h-full w-[120px] py-2 cursor-pointer select-none', {
            'bg-purplish-gray-1 text-white': isActive,
            'text-gray-1': !isActive,
          })}>
          {children}
        </div>
      )}
    </BaseItem>
  );
};
