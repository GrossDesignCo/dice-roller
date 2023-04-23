import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

export const GroupHeading = () => {
  const [label, setLabel] = useState('');
  const placeholder = 'Group Header';

  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);

  return editing ? (
    <input
      ref={ref}
      value={label}
      placeholder={placeholder}
      onChange={(e) => setLabel(e.target.value)}
      onBlur={() => setEditing(false)}
      className="group-header"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setEditing(false);
        }
      }}
    />
  ) : (
    <h2
      onClick={() => setEditing(true)}
      className={cx('group-header', { placeholder: !label })}
    >
      {label || placeholder}
    </h2>
  );
};
