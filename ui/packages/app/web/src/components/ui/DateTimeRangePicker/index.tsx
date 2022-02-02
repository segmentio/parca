import {useRef, useState} from 'react';
import cx from 'classnames';
import {Popover} from '@headlessui/react';
import {DateTimeRange, DateUnion} from './utils';
import {useClickAway} from 'react-use';
import DateTimeRangePickerTrigger from './DateTimeRangePickerTrigger';

import './style.css';
import DateTimeRangePickerPanel from './DateTimeRangePickerPanel';

const DateTimeRangePicker = () => {
  const [range, setRange] = useState<DateTimeRange>(new DateTimeRange());
  const [isActive, setIsActive] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickAway(containerRef, () => {
    setIsActive(false);
  });

  return (
    <Popover className="relative">
      <div ref={containerRef} className="relative items-center w-[330px] ">
        <DateTimeRangePickerTrigger
          range={range}
          isActive={isActive}
          onClick={() => {
            setIsActive(true);
          }}
        />
        {isActive ? (
          <Popover.Panel
            className={cx(
              'absolute z-10 w-fit mt-2 rounded shadow-lg ring-1 ring-black ring-opacity-5 arrow-top text-gray-100 dark:text-gray-800'
            )}
            static
          >
            <DateTimeRangePickerPanel
              range={range}
              onChange={(from: DateUnion, to: DateUnion) => {
                setRange(new DateTimeRange(from, to));
                setIsActive(false);
              }}
            />
          </Popover.Panel>
        ) : null}
      </div>
    </Popover>
  );
};

export default DateTimeRangePicker;
