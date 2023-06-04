import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

export interface EditableHeadingProps {
  label: string;
  setLabel: (label: string) => void;
  placeholder?: string;
  className?: string;
  h?: '1' | '2' | '3' | '4' | '5' | '6';
}

export const EditableHeading = ({
  label,
  setLabel,
  placeholder = 'New Group',
  className,
  h = '4',
}: EditableHeadingProps) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
      ref.current?.select();
    }
  }, [editing]);

  return editing ? (
    <input
      ref={ref}
      value={label}
      placeholder={placeholder}
      onChange={(e) => setLabel(e.target.value)}
      onBlur={() => setEditing(false)}
      className={cx('group-header', { [`h${h}`]: h }, className)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setEditing(false);
        }
      }}
    />
  ) : (
    <h2
      onClick={() => setEditing(true)}
      onFocus={() => setEditing(true)}
      tabIndex={0}
      className={cx(
        'group-header',
        { placeholder: !label, [`h${h}`]: h },
        className
      )}
    >
      {label || placeholder}
    </h2>
  );
};
