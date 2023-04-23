import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

export const RemoveButton = ({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={cx('remove-button', className)} title="Remove" {...rest}>
      ✕
    </button>
  );
};
