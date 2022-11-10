import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import Button from '~/components/Button';
import { BaseCustomComponentProps } from '../type';

interface TabProps extends BaseCustomComponentProps {
  tabIndex?: number;
  tabs: string[];
  children?: ReactNode[];
}

export default function Tab(props: TabProps) {
  const { tabs, tabIndex = 0, children = [], className } = props;
  const [tabSelected, setTabSelected] = useState(tabIndex);

  const handleTabClick = (index: number) => () => {
    setTabSelected(index);
  };

  return (
    <>
      <div className={clsx("flex gap-3 pb-2 border-b-4 border-primary", className)}>
        {tabs.map((t, i) => (
          <Button
            key={i}
            className={clsx('w-[168px] border border-[#B4B4B4] font-medium', {
              'bg-white text-[#767777]': i !== tabSelected,
            })}
            onClick={handleTabClick(i)}
          >
            {t}
          </Button>
        ))}
      </div>
      {children[tabSelected] ? children[tabSelected] : null}
    </>
  );
}
