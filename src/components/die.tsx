import { Ubuntu_Mono } from 'next/font/google';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { rollDie } from '@/utils/roll-die';

const mono = Ubuntu_Mono({ subsets: ['latin'], weight: ['400', '700'] });

export const dieTypes = {
  D3: 3,
  D5: 5,
  D6: 6,
  D10: 10,
  D12: 12,
  D20: 20,
  D100: 100,
} as const;
export type DieType = keyof typeof dieTypes;

export interface DieProps {
  type: DieType;
  value?: number;
  roll?: () => void;
}

export const Die = ({ type, value = 1, roll }: DieProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [firstRender, setFirstRender] = useState(true);
  const length = dieTypes[type].toString().length;
  const paddedValue = displayValue.toString().padStart(length, '_');

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    const interval = setInterval(() => {
      setDisplayValue(() => rollDie(type));
    }, 50);

    const clear = () => {
      clearInterval(interval);
      setDisplayValue(value);
    };

    setTimeout(() => {
      clear();
    }, 500);

    return clear;
  }, [value, type, firstRender]);

  // Special styling for min/max vlaues
  const crit = displayValue === dieTypes[type];
  const critFail = displayValue === 1;

  return (
    <button
      className={cx(
        'die',
        {
          crit: crit,
          'crit-fail': critFail,
        },
        mono.className
      )}
      onClick={roll}
    >
      <div className="die-value">{paddedValue}</div>
      <div className="die-type">{type}</div>
    </button>
  );
};
