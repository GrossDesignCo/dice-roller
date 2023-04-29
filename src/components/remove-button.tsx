import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

export const RemoveButton = ({
  className,
  title = 'Remove',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={cx('remove-button', className)} title={title} {...rest}>
      ✕
    </button>
  );
};
