import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

export const Button = ({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button className={cx('button', className)} {...rest} />;
};
