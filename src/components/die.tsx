import { Ubuntu_Mono } from 'next/font/google';
import cx from 'classnames';

const mono = Ubuntu_Mono({ subsets: ['latin'], weight: '400' });

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
}

export const Die = ({ type, value = 1 }: DieProps) => {
  const length = dieTypes[type].toString().length;
  const paddedValue = value.toString().padStart(length, '_');

  return (
    <button className={cx('die', mono.className)}>
      {paddedValue}/{type}
    </button>
  );
};
