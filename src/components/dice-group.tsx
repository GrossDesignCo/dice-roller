import { GroupHeading } from './group-heading';
import { RemoveButton } from './remove-button';
import { Button } from './button';
import { useState } from 'react';
import { Die, DieProps, DieType, dieTypes } from './die';
import { v4 as uuid } from 'uuid';
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

  return (
    <section className="dice-group">
      <div className="dice-group-heading">
        <GroupHeading label={label} setLabel={setLabel} />

        <AddDie addDie={addDie} />

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
          <div className="die feaux">&nbsp;</div>
        )}
      </div>
    </section>
  );
};
