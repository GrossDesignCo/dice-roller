import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

export interface GroupHeadingProps {
  label: string;
  setLabel: (label: string) => void;
}

export const GroupHeading = ({ label, setLabel }: GroupHeadingProps) => {
  const placeholder = 'Group Label';

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
      className="h4 group-header"
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
      className={cx('h4 group-header', { placeholder: !label })}
    >
      {label || placeholder}
    </h2>
  );
};
