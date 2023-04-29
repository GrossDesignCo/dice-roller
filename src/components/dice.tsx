import { useState } from 'react';
import { Die, DieProps, DieType, dieTypes } from './die';
import { Button } from './button';
import { RemoveButton } from './remove-button';

const typesArr = Object.keys(dieTypes) as DieType[];

export const Dice = () => {
  const [dice, setDice] = useState<DieProps[]>([]);

  const rollAllDice = () => {
    const newDice = dice.map((die) => {
      return {
        type: die.type,
        value: Math.floor(Math.random() * dieTypes[die.type]) + 1,
      };
    });
    setDice(newDice);
  };

  const addDie = (type: DieType) => {
    setDice((prev) => [...prev, { type, value: 1 }]);
  };

  const removeDie = (index: number) => {
    setDice((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
  };

  return (
    <div className="dice">
      <div className="actual-dice">
        {Boolean(dice.length) ? (
          <>
            {dice.map((die, i) => {
              return (
                <div className="die-container" key={i}>
                  <Die type={die.type} value={die.value} />
                  <RemoveButton
                    className="remove-die"
                    onClick={() => removeDie(i)}
                    title="Remove Die"
                  />
                </div>
              );
            })}

            <Button className="roll-all" onClick={rollAllDice}>
              Roll
            </Button>
          </>
        ) : (
          <div className="die feaux">&nbsp;</div>
        )}
      </div>

      <div className="dice-actions">
        Add{' '}
        {typesArr.map((type) => {
          return (
            <Button className="add" onClick={() => addDie(type)}>
              {type}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
