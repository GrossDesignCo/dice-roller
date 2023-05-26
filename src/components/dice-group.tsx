import { GroupHeading } from './group-heading';
import { RemoveButton } from './remove-button';
import { Button } from './button';
import { useEffect, useRef, useState } from 'react';
import { Die, DieProps, DieType, dieTypes } from './die';
import cx from 'classnames';
import { AddDie } from './add-die';

export interface DiceGroupData {
  dice: {
    [id: string]: DieProps;
  };
  label: string;
}

export interface DiceGroupProps extends DiceGroupData {
  removeGroup: () => void;
  rollAllDice: () => void;
  addDie: (type: DieType) => void;
  rollDie: (id: string) => void;
  removeDie: (id: string) => void;
  setLabel: (label: string) => void;
}

export const DiceGroup = ({
  label,
  setLabel,
  removeGroup,
  dice,
  rollAllDice,
  addDie,
  rollDie,
  removeDie,
}: DiceGroupProps) => {
  const asArray = Object.entries(dice);
  const headingRef = useRef<HTMLDivElement>(null);
  const [addMode, setAddMode] = useState(false); // TODO: get out of add mode when user clicks away

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAddMode(false);
      }
    };
    const handleClickOut = (e: MouseEvent) => {
      if (
        headingRef.current &&
        !headingRef.current.contains(e.target as HTMLElement)
      ) {
        setAddMode(false);
      }
    };

    if (addMode) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('click', handleClickOut);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickOut);
    };
  }, [addMode]);

  return (
    <section className="dice-group">
      <div className={cx('dice-group-heading', { highlight: addMode })}>
        <div className="heading-content" ref={headingRef}>
          {!addMode ? (
            <>
              <GroupHeading label={label} setLabel={setLabel} />

              <Button
                className="add-dice"
                onClick={(e) => {
                  e.stopPropagation();
                  setAddMode(true);
                }}
                title="Add Die"
              >
                +
              </Button>
            </>
          ) : (
            <>
              <RemoveButton
                onClick={() => setAddMode(false)}
                title="JK, Don't add anything"
              />
              <AddDie addDie={addDie} />
            </>
          )}
        </div>

        <RemoveButton onClick={() => removeGroup?.()} title="Remove Group" />
      </div>

      <div className="dice">
        {Boolean(asArray.length) ? (
          <>
            {asArray.map(([id, die]) => {
              return (
                <div className="die-container" key={id}>
                  <Die {...die} roll={() => rollDie(id)} />

                  <RemoveButton
                    className="remove-die"
                    onClick={() => removeDie(id)}
                    title="Remove Die"
                  />
                </div>
              );
            })}

            <Button className="roll-all" onClick={rollAllDice}>
              Roll All
            </Button>
          </>
        ) : (
          <button
            className="die feaux"
            onClick={(e) => {
              e.stopPropagation();
              setAddMode(true);
            }}
            title="Add Die"
          >
            +
          </button>
        )}
      </div>
    </section>
  );
};
